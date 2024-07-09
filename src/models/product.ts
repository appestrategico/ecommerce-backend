import mongoose, { Schema, Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  price: number;
  description?: string;
  category: string;
  stock: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
});

export default mongoose.model<Product>('Product', ProductSchema);
