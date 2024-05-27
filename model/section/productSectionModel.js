import mongoose from "mongoose";

const productSectionsSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: [true, "Please add the UserName"],
      },
      image: {
          type: String,
          required: [true, "Please add the image"],
        },
    category: {
      id: {
        type: String,
        required: [true, "Please add the categoryId"],
      },
      title: {
        type: String,
        required: [true, "Please add the categoryTitle"],
      },
    },
    step: {
      id: {
        type: String,
        required: [true, "Please add the step"],
      },
      title: {
        type: String,
        required: [true, "Please add the stepTitle"],
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("productSections", productSectionsSchema);
