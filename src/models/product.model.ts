import { Product } from '@/interfaces/product.interface';
import { model, Schema, Document, Types } from 'mongoose';

const productsSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: Array, required: true },
    posters: { type: Array, required: true },
    discount: { type: Number, required: true },
    category: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    note: { type: String, required: true },
  },
  { timestamps: true },
);
const productModel = model<Product & Document>('product', productsSchema);

export default productModel;
