import express from "express";
import {registerUser , loginUser } from "../controller/loginController.js"

export const loginRoutes = express.Router();
export const loginCaptchaRoutes = express.Router();

// loginRoutes.get("/signup", (req, res)=> res.json("signUp"));
loginRoutes.post("/signup", registerUser);
loginRoutes.post("/login", loginUser);

