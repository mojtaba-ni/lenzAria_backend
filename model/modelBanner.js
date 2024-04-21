import mongoose from "mongoose";

const modelBannerSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please add the BannerImage"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("modelBanners", modelBannerSchema);
