import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

const ProductSchema: Schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      index: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true
    },
    imageUrl:{
      type: String,
      default: "image.jpg"
    }
  },
  {
    timestamps: true,
  }
  
);

//compound index for common query
ProductSchema.index({category:1,price:1})
ProductSchema.index({stock: 1, price: 1})

ProductSchema.index({name:'text',category:'text'})

export default mongoose.model<IProduct>('Product', ProductSchema);
