import { Cart } from '@/interfaces/cart.interface';
import { Document, model, Schema, Types } from 'mongoose';

const cartsSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    idUser: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    status: { type: Number, default: 1 },
    products: { type: Array, required: true },
    totalCost: { type: Number, required: true },
    totalSellingAmount: { type: Number, required: true },
    deliveryAmount: { type: Number, required: true },
  },
  { timestamps: true },
);
const cartModel = model<Cart & Document>('carts', cartsSchema);

export default cartModel;
