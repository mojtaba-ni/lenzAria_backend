import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import userModel from "../model/userModel.js";
import { SuccesResponse } from "../config/response.js";

//@ desc getAllUser
//@ route GET api/user/all
//@ access public
export const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await userModel.find()

    if(!users){
        res.status(400).send([])
        throw new errorHandler("There are no users")
    }

    res.status(200).send(SuccesResponse(users));
   
})