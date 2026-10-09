import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: string;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin','buyer'],
      default: 'buyer',
    },
    resetCode: {
    type: String,
    },

    resetCodeExpires: {
        type: Date,
    },
  },
  {
    timestamps: true,
  }
);
// compound index(multiple fields)
UserSchema.index({name: 1, email: 1});

//text index for search
UserSchema.index({name:'text', email:'text'});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
