import { Category } from '@/interfaces/product.interface';
import { Document, model, Schema, Types } from 'mongoose';

const categoriesSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    name: { type: String, required: true },
    key: { type: String, required: true },
    logos: { type: Object, required: true },
    isDeleted: { type: Boolean, default: false },
    subCategory: { type: Array, default: [] },
  },
  { timestamps: true },
);
const categoryModel = model<Category & Document>('category', categoriesSchema);

export default categoryModel;
