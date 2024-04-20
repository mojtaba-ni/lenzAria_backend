import mongoose from "mongoose";
import { productSchema } from "./productModel.js";

export const stepSchema = mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    title: {  
      type: String,
      required: [true, "Please add the stepTitle"],
    },
    product: [
      productSchema
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("steps", stepSchema);
