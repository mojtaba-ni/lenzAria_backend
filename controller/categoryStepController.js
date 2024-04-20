import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import { SuccesResponse } from "../config/response.js";
import categoryModel from "../model/categoryModel.js";
import stepModel from "../model/stepModel.js";

//@ desc getAllCategory
//@ route POST api/category/getAllCategory
//@ access public
export const getAllCategory = expressAsyncHandler(async (req, res) => {
  const categories = await categoryModel.find();
  res.status(200).json(SuccesResponse(categories));
});

//@ desc getAllCategory
//@ route POST api/category/getAllCategory
//@ access public
export const getCategoryById = expressAsyncHandler(async (req, res) => {
  const {id} = req.query
  const category = await categoryModel.findOne({_id:id});
  res.status(200).json(SuccesResponse(category));
});

//@ desc addBrand
//@ route POST api/category/add
//@ access public
export const addCategory = expressAsyncHandler(async (req, res) => {
  const { title, step } = req.body;
  if (!title || !step) {
    res.status(400);
    throw new errorHandler("Please fill out all");
  }
  const checkCategory = await categoryModel.findOne({ title });
  if (checkCategory) {
    res.status(400);
    throw new errorHandler("its already exist");
  }
  // for (let index = 0; index < step.length; index++) {
  //   const element = step[index];
  //   await stepModel.create({
  //     title : element.title
  //   });
    
  // }
  await categoryModel.create({
    title,
    step,
  });
  res.status(200).json(SuccesResponse());
});

//@ desc deleteCategory
//@ route DELETE api/category/delete
//@ access public
export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { categoryId } = req.body;
  const findCategory = await categoryModel.findOne({ _id: categoryId });
  if (!categoryId) {
    res.status(400);
    throw new errorHandler("Please fill out categoryId");
  }
  if (!findCategory) {
    res.status(404);
    throw new errorHandler("category not exist or its already removed");
  }
  await categoryModel.deleteOne({ _id: categoryId });
  res.status(200).send(SuccesResponse());
  return;
});



//@ desc updateCategory
//@ route UPDATE api/category/edit
//@ access public
export const updateCategory = expressAsyncHandler(async (req, res) => {
  
  const { title, step , categoryId } = req.body;
  console.log({categoryId});
  console.log({title});
  const findCategory= await categoryModel.findOne({ _id: categoryId });
  if (!categoryId) {
    res.status(400);
    throw new errorHandler("Please fill out blogId");
  }
  if (!findCategory) {
    res.status(404);
    throw new errorHandler("product not exist or its already removed");
  }
  const newdata = await categoryModel.updateOne({ _id: categoryId } , { title , step});
  res.status(200).send(SuccesResponse(newdata));
  return;
});


//@ desc getAllStep
//@ route GET api/step/getAllStep
//@ access public
export const getAllStep = expressAsyncHandler(async (req, res) => {
  const {id} = req.query
  const category = await categoryModel.findOne({_id:id});
  const steps = category?.step
  res.status(200).json(SuccesResponse(steps));
});