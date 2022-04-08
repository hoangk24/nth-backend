import { model, Schema, Document, Types } from 'mongoose';
import { Role, User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema(
  {
    _id: Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: { type: String, required: true },
    role: {
      type: Number,
      default: Role.GUEST,
    },
    avatar: { type: String, default: '' },
  },
  { timestamps: true },
);

const userModel = model<User & Document>('users', userSchema);

export default userModel;
