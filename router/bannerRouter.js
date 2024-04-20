import express from "express";
import { addMainBanner, addOfferBanner, deleteMainBanner, deleteOfferBanner, getAllMainBanner, getAllOfferBanner } from "../controller/bannerController.js";

export const mainBannerRoutes = express.Router();
export const offerBannerRoutes = express.Router();

// loginRoutes.get("/signup", (req, res)=> res.json("signUp"));
mainBannerRoutes.get("/all", getAllMainBanner);
mainBannerRoutes.post("/add", addMainBanner);
mainBannerRoutes.delete("/delete", deleteMainBanner);

offerBannerRoutes.get("/all", getAllOfferBanner);
offerBannerRoutes.post("/add", addOfferBanner);
offerBannerRoutes.delete("/delete", deleteOfferBanner);
