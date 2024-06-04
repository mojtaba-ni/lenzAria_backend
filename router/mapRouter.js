import express from "express";
import {registerUser , loginUser } from "../controller/loginController.js"
import { addMap, getAllMap } from "../controller/mapController.js";

export const mapRoutes = express.Router();

// loginRoutes.get("/signup", (req, res)=> res.json("signUp"));
mapRoutes.get("/getAllMap", getAllMap);
mapRoutes.post("/add", addMap);
