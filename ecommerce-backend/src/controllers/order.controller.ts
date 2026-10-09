import mongoose from "mongoose";
import {Response} from 'express';
import { Order } from "../models/order.model";
import {Product} from "../models/Product";
import {AuthRequest} from "../middleware/authMiddleware";
import  * as emailService from "../services/emailService";
export const createOrder = async (req: AuthRequest, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {products} = req.body;
        const userId = req.user?.id;

        let totalAmount = 0;
        const orderProducts = [];

        //check stock and calculate total
        for(const item of products){
            const product = await Product.findById(item.productId).session(session);

            if(!product){
                throw new Error(`Product ${item.productId} not found`);
            }

            if(product.quantity < item.quantity){
                throw new Error(`Insufficient stock for ${product.name}`);
            }

            //update product quantity
            product.quantity -= item.quantity;
            if(product.quantity === 0){
                product.stock = false;
            }
            await product.save({session});

            orderProducts.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });

            totalAmount += product.price * item.quantity;
        }

        //Create order
        const order= await Order.create([{
            user: userId,
            products: orderProducts,
            totalAmount,
            status: 'pending'
        }], {session});

        //Commit transaction
        await session.commitTransaction();

        // Send order Confirmation Email
        if(userEmail){
            emailService.sendOrderConfirmationEmail(
                userEmail,
                userName,
                order[0]._id.toString(),
                totalAmount
            ).catch(err => console.error("Order confirmatio email error", err))
        }

        res.status(201).json({
            success: true,
            message: 'Order created successfully', 
            data: order[0]
        });
    }catch(error: any){
        //Rollback transaction on error
        await session.abortTransaction();

        res.status(400).json({
            success: false,
            message: error.message
        });
    }finally{
        session.endSession();
    };
};

// Get logged in user's orders

export const getUserOrders = async (req: AuthRequest, res: Response) => {
    try{
        const orders = await Order.find({user: req.user?.id}).populate('products.product', 'name price');

        res.status(200).json({
            success: true,
            data: orders,
        });
    }catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// Get order by ID
export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> =>{
    try{
        const order = await Order.findById(req.params.id).populate('products.product','name price');

        if(!order){
            res.status(404).json({success: false, message: 'order not found'});
            return;
        }

        //Make sure the user only fetches their own order 
        if(order.user.toString() !== req.user?.id){
            res.status(401).json({
                success: false,
                message: 'Not authorized to view this order'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: order
        });
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}