import express from "express";
import { addBrand, getAllBrand, deleteBrand } from "../controller/brandController.js";

export const brandRoutes = express.Router();

brandRoutes.post("/add", addBrand);
brandRoutes.get("/getAllBrand", getAllBrand);
brandRoutes.delete("/delete" , deleteBrand)
