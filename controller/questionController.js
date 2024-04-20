import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import { SuccesResponse } from "../config/response.js";
import brandModel from "../model/brandModel.js";
import questionModel from "../model/questionModel.js";


//@ desc getAllQuestion
//@ route POST api/question/getAllQuestion
//@ access public
export const getAllQuestion = expressAsyncHandler(async (req, res) => {
    const questions = await questionModel.find();
    res.status(200).json(SuccesResponse(questions));
})

//@ desc addQuestion
//@ route POST api/question/add
//@ access public
export const addQuestion = expressAsyncHandler(async (req, res) => {
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
export const deleteQuestion = expressAsyncHandler(async (req, res) => {
    const { brandId } = req.body;
    console.log(req.body);
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
  