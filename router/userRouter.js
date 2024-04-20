import express from "express";
import { getAllUsers } from "../controller/userController.js";



export const usersRoutes = express.Router();


usersRoutes.get("/getAllUsers" , getAllUsers)
// userRoutes.get("/:id" , getAllUser)