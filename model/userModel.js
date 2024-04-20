import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the UserName"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add the UserName"],
      },
    password: {
      type: String,
      required: [true, "Please add the Password"],
    },
    role: {
      type: String, // "admin" , "user" , "vipUser"
      required: [true, "Please add the role"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);
