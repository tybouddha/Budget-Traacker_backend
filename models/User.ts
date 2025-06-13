import mongoose from "mongoose";
import { Schema } from "mongoose";
import UserType from "../types/userType";

const userSchema = new Schema<UserType>({
  username: String,
  email: String,
  password: String,
  token: String,
});

const User = mongoose.model("users", userSchema);

export default User;
