import express from "express";
import { addBrand, getAllBrand, deleteBrand } from "../controller/brandController.js";

export const quetionRoutes = express.Router();

quetionRoutes.post("/add", addBrand);
quetionRoutes.get("/getAllQuestion", getAllBrand);
quetionRoutes.delete("/delete" , deleteBrand)
