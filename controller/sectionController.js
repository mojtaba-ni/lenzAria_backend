
import expressAsyncHandler from "express-async-handler";
import sectionModel from "../model/section/sectionModel.js";
import { SuccesResponse } from "../config/response.js";
import productSectionModel from "../model/section/productSectionModel.js";


//@ desc getAllSection
//@ route POST api/section/getAll
//@ access public
export const getAllSection = expressAsyncHandler(async (req, res) => {
    const sections = await sectionModel.find();
    
    res.status(200).json(SuccesResponse(sections));
})

//@ desc addSection
//@ route POST api/section/add
//@ access public
export const addSection = expressAsyncHandler(async (req, res) => {
    const { title, image, category , step} = req.body;
    if (!title || !image || !category || !step) {
      res.status(400);
      throw new errorHandler("Please fill out all");
    }
    const newSection = await sectionModel.findOne({title})
    if(newSection){
        res.status(400);
        throw new errorHandler("its already exist");
    }
    await sectionModel.create({
        title, image, category , step
    });
   
    res.status(200).json(SuccesResponse());
 })

//@ desc deleteSection
//@ route DELETE api/section/delete
//@ access public
export const deleteSection = expressAsyncHandler(async (req, res) => {
   const { sectionId } = req.body;
    const sections = await sectionModel.deleteOne({_id: sectionId});
    res.status(200).json(SuccesResponse(sections));
})


//@ desc getAllSection
//@ route GET api/productSection/getAll
//@ access public
export const getAllPrSection = expressAsyncHandler(async (req, res) => {
    const prSections = await productSectionModel.find();
    res.status(200).json(SuccesResponse(prSections));
})

//@ desc addSection
//@ route POST api/section/add
//@ access public
export const addPrSection = expressAsyncHandler(async (req, res) => {
    const { title, image, category , step} = req.body;
    if (!title || !image || !category || !step) {
      res.status(400);
      throw new errorHandler("Please fill out all");
    }
    const newSection = await productSectionModel.findOne({title})
    if(newSection){
        res.status(400);
        throw new errorHandler("its already exist");
    }
    await productSectionModel.create({
        title, image, category , step
    });
    res.status(200).json(SuccesResponse());
 })

//@ desc deletePrSection
//@ route DELETE api/productSection/delete
//@ access public
export const deletePrSection = expressAsyncHandler(async (req, res) => {
    const { sectionId } = req.body;
    const prSections = await productSectionModel.deleteOne({_id: sectionId});
    res.status(200).json(SuccesResponse(prSections));
})