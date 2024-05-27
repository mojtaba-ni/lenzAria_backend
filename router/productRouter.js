import express from "express";
import { addProduct, deleteProduct, getAllProduct, getProductByBrandId, getProductById, getProductByPeriodId, getProductBySearch, updateProduct } from "../controller/productController.js";


export const productRoutes = express.Router();

// loginRoutes.get("/signup", (req, res)=> res.json("signUp"));
productRoutes.get("/", getAllProduct);
productRoutes.get("/getById", getProductById);
productRoutes.get("/getProductByBrandId", getProductByBrandId);
productRoutes.get("/getProductByPeriodId", getProductByPeriodId);
productRoutes.get("/search", getProductBySearch);
productRoutes.post("/add", addProduct);
productRoutes.delete("/delete", deleteProduct);
productRoutes.put("/update", updateProduct);

