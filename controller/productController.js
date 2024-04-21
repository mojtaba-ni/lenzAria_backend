import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import blogModel from "../model/blogModel.js";
import { SuccesResponse } from "../config/response.js";
import productModel from "../model/productModel.js";
import categoryModel from "../model/categoryModel.js";

//@ desc getAllProduct
//@ route GET api/product/getAllProduct
//@ access public
export const getAllProduct = expressAsyncHandler(async (req, res) => {
  const products = await productModel.find();
  res.status(200).json(SuccesResponse(products));
});

//@ desc getProductById
//@ route GET api/product/getProductById
//@ access public
export const getProductById = expressAsyncHandler(async (req, res) => {
  const { id } = req.query;
  const product = await productModel.findOne({ _id: id });
  res.status(200).json(SuccesResponse(product));
});

//@ desc addProduct
//@ route POST api/product/add
//@ access public
export const addProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    description,
    Specifications,
    price,
    image,
    step,
    category,
  } = req.body;
  if (
    !name ||
    !description ||
    !Specifications ||
    !price ||
    !image ||
    !step ||
    !category
  ) {
    res.status(400);
    throw new errorHandler("Please fill out all");
  }
  // const findCategory = await categoryModel.findOne({ _id: categoryId });
  // const categorySteps = findCategory.step;
  // const theStep = categorySteps.filter((item) => item._id == "662371d692386afba8968d28");
  // console.log({categorySteps});
  // console.log({theStep});
  // theStep?.product?.push({
  //   categoryId,
  //   stepId,
  //   name,
  //   description,
  //   Specifications,
  //   price,
  //   image,
  // })
  // await categoryModel.save()
  // updateCategory = await categoryModel.updateOne({ _id: categoryId });
  const product = await productModel.create({
    category,
    step,
    name,
    description,
    Specifications,
    price,
    image,
  });
  // console.log({product});
  res.status(200).json(SuccesResponse(product));
});

//@ desc deleteProduct
//@ route DELETE api/product/delete
//@ access public
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { productId } = req.body;
  console.log(req.body);
  const findProduct = await productModel.findOne({ _id: productId });
  if (!productId) {
    res.status(400);
    throw new errorHandler("Please fill out productId");
  }
  if (!findProduct) {
    res.status(404);
    throw new errorHandler("product not exist or its already removed");
  }
  await productModel.deleteOne({ _id: productId });
  res.status(200).send(SuccesResponse());
  return;
});

//@ desc updateProduct
//@ route UPDATE api/blog/update
//@ access public
export const updateProduct = expressAsyncHandler(async (req, res) => {
  const {
    productId,
    category,
    step,
    name,
    description,
    Specifications,
    price,
    image,
  } = req.body;
  const findProduct = await productModel.findOne({ _id: productId });
  if (!productId) {
    res.status(400);
    throw new errorHandler("Please fill out blogId");
  }
  if (!findProduct) {
    res.status(404);
    throw new errorHandler("product not exist or its already removed");
  }
  await productModel.updateOne(
    { _id: productId },
    { category, step, name, description, Specifications, price, image }
  );
  res.status(200).send(SuccesResponse());
  return;
});
