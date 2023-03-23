import mongoose, { Schema, Document } from "mongoose";

type User = mongoose.Document & {
  email: string;
  socketId: string;
  name: string;
  avatar: string;
};

const UserSchema = new Schema({
  email: String,
  socketId: String,
  name: String,
  avatar: String,
});

const User = mongoose.model<User>("User", UserSchema);

export { User };
