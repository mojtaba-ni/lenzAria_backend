import mongoose from "mongoose";


const addressSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: "users",
    },
    locations: [
      {
        description: {
            type: String,
            required: [true, "Please add the titleAddress"],
        },
        number:{
            type: Number,
            required: [true, "Please add the HouseNumber"],
        },
        zipCode:{
            type: String,
            required: [true, "Please add the zipCode"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);



export default mongoose.model("addresses", addressSchema);
