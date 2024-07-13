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

export const getlenzProduct = expressAsyncHandler(async (req, res) => {
  const product = await productModel.find();
  const lenzProduct = product.filter((item)=> item.lenzImage != null) 
  res.status(200).json(SuccesResponse(lenzProduct));
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
    lenzImage,
    step,
    category,
    brand,
    period,
    periodId,
  } = req.body;
  if (
    !name ||
    !description ||
    !Specifications ||
    !price ||
    !image ||
    !step ||
    !category ||
    !brand ||
    !period ||
    !periodId 
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
    brand,
    period,
    periodId,
    lenzImage: lenzImage&& lenzImage
  });
  // console.log({product});
  res.status(200).json(SuccesResponse(product));
});

//@ desc deleteProduct
//@ route DELETE api/product/delete
//@ access public
export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { productId } = req.body;
 
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
    imageLenz,
    period,
    periodId,
    brand,
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
    {
      category,
      step,
      name,
      description,
      Specifications,
      price,
      image,
      imageLenz,
      period,
      periodId,
      brand,
    }
  );
  res.status(200).send(SuccesResponse());
  return;
});

//@ desc getNewProduct
//@ route GET api/product/getNewProduct
//@ access public
export const getNewProduct = expressAsyncHandler(async (req, res) => {
  const product = await productModel.find();
  const newProduct  = []
for (let index = product?.length - 5; index < product?.length; index++) {
  const element = product[index];
  if(element){
    newProduct.push(element)
  }

}
  
  res.status(200).json(SuccesResponse(newProduct));
});

//@ desc getProductByBrandId
//@ route GET api/product/getProductByBrandId
//@ access public
export const getProductByBrandId = expressAsyncHandler(async (req, res) => {
  const { brandId} = req.query;
  const product = await productModel.find({ "brand.id": brandId });
  res.status(200).json(SuccesResponse(product));
});

//@ desc getProductByPeriodId
//@ route GET api/product/getProductByPeriodId
//@ access public
export const getProductByPeriodId = expressAsyncHandler(async (req, res) => {
  const { periodId} = req.query;
  const product = await productModel.find({ periodId: periodId });
  res.status(200).json(SuccesResponse(product));
});


//@ desc getProductBySearch
//@ route GET api/product/search
//@ access public
export const getProductBySearch = expressAsyncHandler(async (req, res) => {
  const { name} = req.query;
   
  const product = await productModel.find({ "name": { $regex: ".*"+name+".*"}  });
    console.log({product});
    res.status(200).json(SuccesResponse(product));

 
  

});