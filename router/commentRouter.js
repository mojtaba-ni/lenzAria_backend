import express from "express";
import {
  addComment,
  answerComment,
  deleteComment,
  getAllNoResponseComment,
  getAllProductComment,
  getCommentById,
} from "../controller/commentController.js";

export const commentRoutes = express.Router();

// loginRoutes.get("/signup", (req, res)=> res.json("signUp"));
commentRoutes.get("/getAllProductComment", getAllProductComment);
commentRoutes.get("/getAllNoResponseComment", getAllNoResponseComment);
commentRoutes.get("/getById", getCommentById);
commentRoutes.post("/answersCommentById", answerComment);
commentRoutes.post("/add", addComment);
commentRoutes.delete("/delete", deleteComment);
