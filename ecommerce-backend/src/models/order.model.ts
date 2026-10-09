import mongoose, {Schema,Document} from 'mongoose';

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    products:{
        product: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    status: string;
}

const OrderSchema = new Schema<IOrder>({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [{
        product:{
            type: Schema.Types.ObjectId, 
            ref: 'products',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    totalAmount:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum: ['pending','processing','completed','cancelled'],
        default: 'pending',
    }
},{
    timestamps: true
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);