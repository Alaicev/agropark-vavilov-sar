import mongoose from "mongoose";
const {Schema} = mongoose;

const UserScheme = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  }
);

export default mongoose.model("User", UserScheme);
