import express from "express";
import { getAddressByUserId , addAddress } from "../controller/userAddressController.js";


export const UserAddressRoutes = express.Router();

// loginRoutes.get("/signup", (req, res)=> res.json("signUp"));
UserAddressRoutes.get("/getAddress", getAddressByUserId);
UserAddressRoutes.post("/add", addAddress);
