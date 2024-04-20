import mongoose from "mongoose";

export const productSchema = mongoose.Schema(
  {
    cateroyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    stepId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "steps",
    },
    name: {
      type: String,
      required: [true, "Please add the UserName"],
    },
    description: {
      type: String,
      required: [true, "Please add the description"],
    },
    Specifications: {
      type: String,
      required: [true, "Please add the Specifications   "],
    },
    image: {
      type: String,
      required: [true, "Please add the image"],
    },
    score: {
        type: Number,
    },
    price: {
      type: Number,
      required: [true, "Please add the price"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("products", productSchema);
