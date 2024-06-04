import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the UserName"],
    },
    description: {
      type: String,
      required: [true, "Please add the UserName"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("questions", questionSchema);
