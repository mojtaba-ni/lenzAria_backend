import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import { SuccesResponse } from "../config/response.js";
import userAddressModel from "../model/userAddressModel.js";

//@ desc getAddressByUserId
//@ route GET api/address/getAddressByUserId
//@ access public
export const getAddressByUserId = expressAsyncHandler(async (req, res) => {
    const {userId} = req.query

    if(!userId){
        res.status(400)
        throw new errorHandler("Please fill out all")
    }
    const addressData = await userAddressModel.findOne({userId}) 
    res.status(200).send(SuccesResponse(addressData));
})


//@ desc addAddress
//@ route GET api/address/add
//@ access public
export const addAddress = expressAsyncHandler(async (req, res) => {
    const {address , userId} = req.body
    if(!userId || !address){
        res.status(400)
        throw new errorHandler("Please fill out all")
    }
    const userAddress = await userAddressModel.findOneAndUpdate({userId})
    if(userAddress){
        const loca = userAddress.locations
        loca.push(address)
        
    //    const data =  await userAddress.updateOne({userId} , {locations:} )
       console.log({data});
    }
    else{
        const createAddress = await userAddressModel.create({
            userId,
            locations:address
          });
    }
    res.status(200).send(SuccesResponse());
   
    
   
})