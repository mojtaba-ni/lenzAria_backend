import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import blogModel from "../model/blogModel.js";
import { SuccesResponse } from "../config/response.js";

//@ desc getAllBlogs
//@ route GET api/blog/getAllBlogs
//@ access public
export const getAllBlogs = expressAsyncHandler(async (req, res) => {
  const blogs = await blogModel.find();
  res.status(200).json(SuccesResponse(blogs));
});

//@ desc getById
//@ route GET api/blog/getBlogById
//@ access public
export const getBlogById = expressAsyncHandler(async (req, res) => {
  const {id} = req.query
  const blogs = await blogModel.findOne({_id:id});
  res.status(200).json(SuccesResponse(blogs));
});

//@ desc addBlog
//@ route POST api/blog/add
//@ access public
export const addBlog = expressAsyncHandler(async (req, res) => {
  const { blogTitle, introduction, detail } = req.body;
  if (!blogTitle || !introduction || !detail) {
    res.status(400);
    throw new errorHandler("Please fill out all");
  }
  const blog = await blogModel.create({
    blogTitle,
    introduction,
    detail,
  });
  res.status(200).json(SuccesResponse(blog));
});

//@ desc deleteBlog
//@ route DELETE api/blog/delete
//@ access public
export const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { blogId } = req.body;

  const findBlog = await blogModel.findOne({ _id: blogId });
  if (!blogId) {
    res.status(400);
    throw new errorHandler("Please fill out blogId");
  }
  if (!findBlog) {
    res.status(404);
    throw new errorHandler("blog not exist or its already removed");
  }
  await blogModel.deleteOne({ _id: blogId });
  res.status(200).send(SuccesResponse());
  return;
});

//@ desc deleteBlog
//@ route UPDATE api/blog/update
//@ access public
export const updateBlog = expressAsyncHandler(async (req, res) => {
  const { blogId } = req.body;
  const findBlog = await blogModel.findOne({ _id: blogId });
  if (!blogId) {
    res.status(400);
    throw new errorHandler("Please fill out blogId");
  }
  if (!findBlog) {
    res.status(404);
    throw new errorHandler("blog not exist or its already removed");
  }
  await blogModel.updateOne({ _id: blogId });
  res.status(200).send(SuccesResponse());
  return;
});
