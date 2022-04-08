import { Token } from '@/interfaces/token.interface';
import { Document, model, Schema } from 'mongoose';

const tokenSchema: Schema = new Schema(
  {
    idUser: { type: String, required: true },
    token: { type: String, required: true },
  },
  { timestamps: true },
);

const tokenModel = model<Token & Document>('tokens', tokenSchema);

export default tokenModel;
