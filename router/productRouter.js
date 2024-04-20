import express from "express";
import { addProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from "../controller/productController.js";


export const productRoutes = express.Router();

// loginRoutes.get("/signup", (req, res)=> res.json("signUp"));
productRoutes.get("/", getAllProduct);
productRoutes.get("/getById", getProductById);
productRoutes.post("/add", addProduct);
productRoutes.delete("/delete", deleteProduct);
productRoutes.put("/update", updateProduct);

