import express from "express";
import { addMap, deleteMap, getAllMap } from "../controller/mapController.js";

export const mapRoutes = express.Router();

// loginRoutes.get("/signup", (req, res)=> res.json("signUp"));
mapRoutes.get("/getAllMap", getAllMap);
mapRoutes.post("/add", addMap);
mapRoutes.post("/delete", deleteMap);
