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
userSchema.pre("save", async function preSave(this: UserDocument, next) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const existingUser = await User.findOne({ email: this.email });

  if (existingUser) {
    throw new Error("email is already in the DB");
  }
  next();
});
const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
