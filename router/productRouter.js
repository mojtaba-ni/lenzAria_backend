import express from "express";
import { addProduct, deleteProduct, getAllProduct, getlenzProduct, getNewProduct, getProductByBrandId, getProductById, getProductByPeriodId, getProductBySearch, updateProduct } from "../controller/productController.js";


export const productRoutes = express.Router();

// loginRoutes.get("/signup", (req, res)=> res.json("signUp"));
productRoutes.get("/", getAllProduct);
productRoutes.get("/getById", getProductById);
productRoutes.get("/getProductByBrandId", getProductByBrandId);
productRoutes.get("/getProductByPeriodId", getProductByPeriodId);
productRoutes.get("/getlenzProduct", getlenzProduct);
productRoutes.get("/getNewProduct", getNewProduct);
productRoutes.get("/search/:name?", getProductBySearch);
productRoutes.post("/add", addProduct);
productRoutes.delete("/delete", deleteProduct);
productRoutes.put("/update", updateProduct);

