import mongoose from "mongoose";
import  { stepSchema } from "./stepModel.js";

const categorySchema = mongoose.Schema(
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
