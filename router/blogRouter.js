import express from "express";
import { addBlog, deleteBlog, getAllBlogs, getBlogById } from "../controller/blogController.js";

export const blogRoutes = express.Router();

blogRoutes.post("/add", addBlog);
blogRoutes.get("/getAllBlogs", getAllBlogs);
blogRoutes.get("/getById/:id?", getBlogById);
blogRoutes.delete("/delete" , deleteBlog)
