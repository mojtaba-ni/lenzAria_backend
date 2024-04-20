import mongoose from "mongoose";

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the UserName"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("brands", brandSchema);
