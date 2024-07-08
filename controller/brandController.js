import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import { SuccesResponse } from "../config/response.js";
import brandModel from "../model/brandModel.js";


//@ desc getAllBrand
//@ route POST api/brand/add
//@ access public
export const getAllBrand = expressAsyncHandler(async (req, res) => {
    const blogs = await brandModel.find();
    res.status(200).json(SuccesResponse(blogs));
})

//@ desc addBrand
//@ route POST api/brand/add
//@ access public
export const addBrand = expressAsyncHandler(async (req, res) => {
    const { name} = req.body;
    if (!name) {
      res.status(400);
      throw new errorHandler("Please fill out all");
    }
    const checkBrand = await brandModel.findOne({name})
    if(checkBrand){
        res.status(400);
        throw new errorHandler("its already exist");
    }
    await brandModel.create({
      name
    });
    res.status(200).json(SuccesResponse());
});

//@ desc deleteBlog
//@ route DELETE api/blog/delete
//@ access public
export const deleteBrand = expressAsyncHandler(async (req, res) => {
    const { brandId } = req.body;
    const findBrand = await brandModel.findOne({ _id: brandId });
    if (!brandId) {
      res.status(400);
      throw new errorHandler("Please fill out blogId");
    }
    if (!findBrand) {
      res.status(404);
      throw new errorHandler("blog not exist or its already removed");
    }
    await brandModel.deleteOne({ _id: brandId });
    res.status(200).send(SuccesResponse());
    return;
  });
  