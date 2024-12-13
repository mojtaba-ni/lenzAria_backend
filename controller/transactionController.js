import expressAsyncHandler from "express-async-handler";
import ZarinpalPayment from "zarinpal-pay";
import { config } from "dotenv";
import { SuccesResponse } from "../config/response.js";
import transactionModel from "../model/transactionModel.js";
import userModel from "../model/userModel.js";

config();
let zarinpal = new ZarinpalPayment(process.env.MERCHANT, false, true);

export const createTransaction = expressAsyncHandler(async (req, res) => {
  const { phoneNumber, amount } = req.body;
  const user = await userModel.findOne({ phoneNumber: phoneNumber });
  try {
    const createpay = await zarinpal.create({
      amount: amount,
      callback_url: process.env.TRANSACTIONCALLBACK,
      mobile: phoneNumber,
      email: "arshMarket@site.com",
      description: "توضیحات تراکنش",
      order_id: "3010",
    });

    await transactionModel.create({
      userId: user?._id,
      price: amount,
      authority: createpay?.data?.authority,
      isCompelete: true,
    });
    res.status(200).send(SuccesResponse(createpay));
  } catch (err) {
    console.log(err);
  }
});

export const verifyTransaction = expressAsyncHandler(async (req, res) => {
  const { authority } = req.body;
  const transaction = await transactionModel.findOne({ authority: authority });
  try {
    const verifypay = await zarinpal.verify({
      authority,
      amount: transaction?.price,
    });
    res.status(200).send(SuccesResponse(verifypay));
  } catch (err) {
    console.log(err);
  }
});
