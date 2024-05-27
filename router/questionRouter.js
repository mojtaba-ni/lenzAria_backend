import express from "express";
import { addQuestion, deleteQuestion, getAllQuestion } from "../controller/questionController.js";


export const quetionRoutes = express.Router();

quetionRoutes.post("/add", addQuestion);
quetionRoutes.get("/getAllQuestion", getAllQuestion);
quetionRoutes.delete("/delete" , deleteQuestion)
