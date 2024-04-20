import express from "express";
import { addCategory, deleteCategory, getAllCategory, getAllStep, getCategoryById, updateCategory } from "../controller/categoryStepController.js";

export const categoryRoutes = express.Router();
export const stepRoutes = express.Router();


categoryRoutes.get("/getAllCategory", getAllCategory);
categoryRoutes.get("/getCategoryById", getCategoryById);
categoryRoutes.post("/add", addCategory);
categoryRoutes.put("/edit", updateCategory);
categoryRoutes.delete("/delete", deleteCategory);


stepRoutes.get("/getAllStep", getAllStep);
stepRoutes.get("/delete", deleteCategory);
