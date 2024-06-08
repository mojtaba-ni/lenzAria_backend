import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import { SuccesResponse } from "../config/response.js";
import mapModel from "../model/mapModel.js";

//@ desc getAllMap
//@ route GET api/map/getAllMap
//@ access public
export const getAllMap = expressAsyncHandler(async (req, res) => {
    const maps = await mapModel.find()

    if(!maps){
        res.status(400).send([])
        throw new errorHandler("There are no users")
    }

    res.status(200).send(SuccesResponse(maps));
   
})

//@ desc add
//@ route GET api/map/add
//@ access public
export const addMap = expressAsyncHandler(async (req, res) => {
    const { title, description , latitude , longitude } = req.body;
    if (!title || !description || !latitude || !longitude) {
      res.status(400);
      throw new errorHandler("Please fill out all");
    }
    const checkMap = await mapModel.findOne({ title });
    if (checkMap) {
      res.status(400);
      throw new errorHandler("its already exist");
    }
    await mapModel.create({
      title,
      description,
      latitude,
      longitude
    });
    res.status(200).json(SuccesResponse());
})

//@ desc deleteMap
//@ route DELETE api/map/delete
//@ access public
export const deleteMap = expressAsyncHandler(async (req, res) => {
  const { mapId } = req.body;
 
  const findMap = await mapModel.findOne({ _id: mapId });
  if (!mapId) {
    res.status(400);
    throw new errorHandler("Please fill out mapId");
  }
  if (!findMap) {
    res.status(404);
    throw new errorHandler("findMap not exist or its already removed");
  }
  await mapModel.deleteOne({ _id: mapId });
  res.status(200).send(SuccesResponse());
  return;
});