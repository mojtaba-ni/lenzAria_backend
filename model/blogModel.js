import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {

    blogTitle: {
      type: String,
      required: [true, "Please add the blogTitle"],
    },
    introduction: {
      type: String,
      required: [true, "Please add the Introduction"],
    },
    detail: [
      {
        headline: {
          type: String,
          required: [true, "Please add the headline"],
        },
        desc: {
          type: String,
          required: [true, "Please add the desc"],
        },
        image : {
          type: String,
          required: [true, "Please add the desc"],
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("blogs", blogSchema);
