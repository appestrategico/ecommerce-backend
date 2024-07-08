import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export const Order = model('Order', orderSchema);
