import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import { SuccesResponse } from "../config/response.js";
import commentModel from "../model/commentModel.js";


//@ desc getAllproductComment
//@ route GET api/comment/getAllproductComment
//@ access public
export const getAllProductComment = expressAsyncHandler(async (req, res) => {
    const {productId} = req.query
    if(!productId){
        return res.status(400).json({message: "productId is required"})
    }
    const comments = await commentModel.find({productId});
    if(!comments){
        return res.status(200).json(SuccesResponse())
    }
    res.status(200).json(SuccesResponse(comments));
})

//@ desc getAllNoResponseComment
//@ route GET api/comment/getAllNoResponseComment
//@ access public
export const getAllNoResponseComment = expressAsyncHandler(async (req, res) => {
  
    const comments = await commentModel.find({response:null});
    if(!comments){
        return res.status(200).json(SuccesResponse())
    }
    res.status(200).json(SuccesResponse(comments));
})

//@ desc getCommentById
//@ route GET api/comment/getCommentById
//@ access public
export const getCommentById  = expressAsyncHandler(async (req, res) => {
    const { id } = req.query;

    const comment = await commentModel.findOne({_id:id});

    if(comment){
        res.status(200).json(SuccesResponse(comment));
    }
    
})

//@ desc addComment
//@ route POST api/comment/add
//@ access public
export const addComment = expressAsyncHandler(async (req, res) => {
    const {productId,title,username} = req.body;
    if (!productId || !title || !username) {
      return res.status(200)
      .json({message: "productId, username and title is required"})
    }
 
    await commentModel.create({
        productId,
        title,
        username,
        response: null
    });
    res.status(200).json(SuccesResponse());
});

//@ desc deleteComment
//@ route DELETE api/comment/delete
//@ access public
export const deleteComment = expressAsyncHandler(async (req, res) => {
    const { commentId } = req.body;
   
    if (!commentId) {
      res.status(400);
      throw new errorHandler("Please fill out commentId");
    }
    const findComment = await commentModel.findOne({ _id: commentId });
    if (!findComment) {
      res.status(404);
      throw new errorHandler("blog not exist or its already removed");
    }
    await commentModel.deleteOne({ _id: commentId });
    res.status(200).send(SuccesResponse());
    return;
  });


//@ desc answerComment
//@ route POST api/comment/answerComment
//@ access public
export const answerComment = expressAsyncHandler(async (req, res) => {
    const {commentId,response} = req.body;

    // const comment = await commentModel.findOne({_id:commentId});
   
    if (!commentId || !response) {
      return res.status(200)
    //   .json({message: "response and commentId is required"})
    }
    const newComment = await commentModel.updateOne({ _id: commentId } , {$set:{response:response}});
    res.status(200).send(SuccesResponse(newComment));
});
  