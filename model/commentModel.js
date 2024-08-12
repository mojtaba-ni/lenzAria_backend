import mongoose from "mongoose";


export const commentSchema = mongoose.Schema(
  {
    username: {
        type: String,
        required: [true, "Please add the username"],
      },
    productId: {
      type: String,
      required: [true, "Please add the productId"],
    },
    title: {
      type: String,
      required: [true, "Please add the stepTitle"],
    },
    response: {
        title: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comments", commentSchema);
