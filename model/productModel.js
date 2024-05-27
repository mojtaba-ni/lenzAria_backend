import mongoose from "mongoose";

export const productSchema = mongoose.Schema(
  {
    group: {
      id:{
        type: String,
        required: [true, "Please add the groupId"],
      },
      title:{
        type: String,
        required: [true, "Please add the groupTitle"],
      }
     
    },
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
