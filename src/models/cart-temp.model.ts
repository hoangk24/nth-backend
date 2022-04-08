import { Cart } from '@/interfaces/cart.interface';
import { Document, model, Schema, Types } from 'mongoose';

const cartsTempSchema: Schema = new Schema({
  _id: Types.ObjectId,
  idUser: { type: String, required: true },
  products: { type: Array, default: [] },
  totalCost: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 },
});
const cartTempModel = model<Cart & Document>('carts-temp', cartsTempSchema);

export default cartTempModel;
