import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import { SuccesResponse } from "../config/response.js";
import questionModel from "../model/questionModel.js";

//@ desc getAllQuestion
//@ route POST api/question/getAllQuestion
//@ access public
export const getAllQuestion = expressAsyncHandler(async (req, res) => {
  const questions = await questionModel.find();
  res.status(200).json(SuccesResponse(questions));
});

//@ desc addQuestion
//@ route POST api/question/add
//@ access public
export const addQuestion = expressAsyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    res.status(400);
    throw new errorHandler("Please fill out all");
  }
  const checkQuestion = await questionModel.findOne({ title });
  if (checkQuestion) {
    res.status(400);
    throw new errorHandler("its already exist");
  }
  await questionModel.create({
    title,
    description,
  });
  res.status(200).json(SuccesResponse());
});

//@ desc deleteBlog
//@ route DELETE api/blog/delete
//@ access public
export const deleteQuestion = expressAsyncHandler(async (req, res) => {
  const { questionId } = req.body;
  const findQuestion = await questionModel.findOne({ _id: questionId });
  if (!questionId) {
    res.status(400);
    throw new errorHandler("Please fill out questionId");
  }
  if (!findQuestion) {
    res.status(404);
    throw new errorHandler("question not exist or its already removed");
  }
  await questionModel.deleteOne({ _id: questionId });
  res.status(200).send(SuccesResponse());
  return;
});
