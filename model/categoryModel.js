import mongoose from "mongoose";
import  { stepSchema } from "./stepModel.js";

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the UserName"],
    },
    step: [
      stepSchema
    ],
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("categories", categorySchema);
