import mongoose from "mongoose";

const mapSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the titleAddress"],
    },
    description: {
      type: String,
      required: [true, "Please add the descriptionAddress"],
    },
    longitude: {
      type: String,
      required: [true, "Please add the titleAddress"],
    },
    latitude: {
      type: String,
      required: [true, "Please add the titleAddress"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("maps", mapSchema);
