import mongoose from "mongoose";

const mainBannerSchema = mongoose.Schema(
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

export default mongoose.model("mainBanners", mainBannerSchema);
