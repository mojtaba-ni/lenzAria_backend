import mongoose from "mongoose";

const offerBannerSchema = mongoose.Schema(
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

export default mongoose.model("offerBanners", offerBannerSchema);
