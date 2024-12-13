import express from "express";
import {
  createTransaction,
  verifyTransaction,
} from "../controller/transactionController.js";

export const transactionRoutes = express.Router();

transactionRoutes.post("/create", createTransaction);
transactionRoutes.post("/verify", verifyTransaction);
