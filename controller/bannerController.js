import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import { SuccesResponse } from "../config/response.js";
import mainBannerModel from "../model/mainBannerModel.js";
import offerBannerModel from "../model/offerBannerModel.js";

//@ desc getAllMainBanner
//@ route GET api/mainBanner/all
//@ access public
export const getAllMainBanner = expressAsyncHandler(async (req, res) => {
  const banners = await mainBannerModel.find();

  if (!banners) {
    res.status(400).send([]);
    throw new errorHandler("There are no users");
  }

  res.status(200).send(SuccesResponse(banners));
});

//@ desc getAllOfferBanner
//@ route GET api/offerBanner/all
//@ access public
export const getAllOfferBanner = expressAsyncHandler(async (req, res) => {
  const banners = await offerBannerModel.find();

  if (!banners) {
    res.status(400).send([]);
    throw new errorHandler("There are no users");
  }

  res.status(200).send(SuccesResponse(banners));
});

//@ desc addMainBanner
//@ route POST api/mainBanner/add
//@ access public
export const addMainBanner = expressAsyncHandler(async (req, res) => {
  const { image } = req.body;
  if (!image) {
    res.status(400);
    throw new errorHandler("Please fill image");
  }
  const checkBanner = await mainBannerModel.findOne({ image });
  if (checkBanner) {
    res.status(400);
    throw new errorHandler("its already exist");
  }
  await mainBannerModel.create({
    image,
  });
  res.status(200).json(SuccesResponse());
});

//@ desc deleteMainBanner
//@ route DELETE api/mainBanner/delete
//@ access public
export const deleteMainBanner = expressAsyncHandler(async (req, res) => {
  const { bannerId } = req.body;
  console.log(req.body);
  const findBrand = await mainBannerModel.findOne({ _id: bannerId });
  if (!bannerId) {
    res.status(400);
    throw new errorHandler("Please fill out blogId");
  }
  if (!findBrand) {
    res.status(404);
    throw new errorHandler("blog not exist or its already removed");
  }
  await mainBannerModel.deleteOne({ _id: bannerId });
  res.status(200).send(SuccesResponse());
  return;
});

//@ desc addOfferBanner
//@ route POST api/offerBanner/add
//@ access public
export const addOfferBanner = expressAsyncHandler(async (req, res) => {
  const { image } = req.body;
  if (!image) {
    res.status(400);
    throw new errorHandler("Please fill image");
  }
  const checkBanner = await offerBannerModel.findOne({ image });
  if (checkBanner) {
    res.status(400);
    throw new errorHandler("its already exist");
  }
  await offerBannerModel.create({
    image,
  });
  res.status(200).json(SuccesResponse());
});

//@ desc deleteOfferBanner
//@ route DELETE api/offerBanner/delete
//@ access public
export const deleteOfferBanner = expressAsyncHandler(async (req, res) => {
  const { bannerId } = req.body;
  console.log(req.body);
  const findBrand = await offerBannerModel.findOne({ _id: bannerId });
  if (!bannerId) {
    res.status(400);
    throw new errorHandler("Please fill out blogId");
  }
  if (!findBrand) {
    res.status(404);
    throw new errorHandler("blog not exist or its already removed");
  }
  await offerBannerModel.deleteOne({ _id: bannerId });
  res.status(200).send(SuccesResponse());
  return;
});
