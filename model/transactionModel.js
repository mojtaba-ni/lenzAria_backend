import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please add the usernameId"],
    },
    price: {
      type: String,
      required: [true, "Please add the price"],
    },
    authority: {
      type: String,
      required: [true, "Please add the authority"],
    },
    isCompelete: {
      type: Boolean,
      required: [true, "its compeleted or not"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("transaction", transactionSchema);
