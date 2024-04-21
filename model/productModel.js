import mongoose from "mongoose";

export const productSchema = mongoose.Schema(
  {
    category: {
      id:{
        type: String,
        required: [true, "Please add the categoryId"],
      },
      title:{
        type: String,
        required: [true, "Please add the categoryTitle"],
      }
     
    },
    step: {
      id:{
        type: String,
        required: [true, "Please add the step"],
      },
      title:{
        type: String,
        required: [true, "Please add the stepTitle"],
      }
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
