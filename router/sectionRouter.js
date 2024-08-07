import express from "express";
import { addPrSection, addSection, deletePrSection, deleteSection, getAllPrSection, getAllSection } from "../controller/sectionController.js";


export const sectionRoutes = express.Router();
export const productSectionRoutes = express.Router();

sectionRoutes.get("/getAll", getAllSection);
productSectionRoutes.get("/getAll", getAllPrSection);

sectionRoutes.post("/add", addSection);
productSectionRoutes.post("/add", addPrSection);

sectionRoutes.delete("/delete" , deleteSection)
productSectionRoutes.delete("/delete" , deletePrSection)
