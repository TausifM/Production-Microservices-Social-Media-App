import mongoose from "mongoose";

// interface vs type ---> intergace normally defined to class and type for props declaration.
type UserDocument = {
  _id: string;
  email: string;
  password: string;
};

export type UserModel = mongoose.Model<UserDocument>;
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
