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
    brand:{
      id:{
        type: String,
        required: [true, "Please add the id"],
      },
      title:{
        type: String,
        required: [true, "Please add the title"],
      }
    },
    name: {
      type: String,
      required: [true, "Please add the UserName"],
    },
    period: {
      type: String,
      required: [true, "Please add the period"],
    },
    periodId: {
      type: Number,
      required: [true, "Please add the periodId"],
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
    imageLenz: {
      type: String,
    },
    score: {
        type: Number,
    },
    price: {
      type: Number,
      required: [true, "Please add the price"],
    },
    rate: {
      type: Number,
      default : 0
    },
    lenzImage: {
      type: String,
      default : null
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("products", productSchema);
