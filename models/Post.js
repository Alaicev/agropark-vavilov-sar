import mongoose from "mongoose";
const {Schema} = mongoose;

const PostScheme = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default:[],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    imageURL: String,
  }
);

export default mongoose.model("Post", PostScheme);
