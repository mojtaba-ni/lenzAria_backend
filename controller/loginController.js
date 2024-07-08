import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import userModel from "../model/userModel.js";
import {verify} from "hcaptcha";
import * as bcrypt from "bcrypt";
import { SuccesResponse } from "../config/response.js";

//@desc login to Mobile
//@route POST /api/register
//@access public
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, password, phoneNumber  } = req.body;

  if (!username || !password || !phoneNumber ) {
    res.status(200);
  
    res.json({
      message: "اطلاعات مورد نطر را وارد کنید",
      statusCode: 200,
      isSuccess: false
    });
    return
  }

  const userAvailable = await userModel.findOne({ username });
  const userAvailablePhoneNumber = await userModel.findOne({ phoneNumber });
  if (userAvailable) {
    res.status(200);
   res.json({
      message: "این نام کاربری قبلا ثبت نام کرده است",
      statusCode: 200,
      isSuccess: false
    });
    return
  }
  if (userAvailablePhoneNumber) {
    res.status(200);
    // throw new er("your phonNumber already register");

   res.json({
      message: "این شماره تلفن قبلا در سیستم ثیت شده است",
      statusCode: 200,
      isSuccess: false
    });
    return
  }
  

 
  const hashPassword = await bcrypt.hash(password, 8);

  const user = await userModel.create({
    username,
    password: hashPassword,
    phoneNumber,
    role: "user",
  });
  const userDataResponse = {
    username: username,
    phoneNumber,
    role: "user",
  }
  res.status(200).json(SuccesResponse(userDataResponse));
    return
  
 
});

//@desc Login user
//@route POST  /api/user/login
//@access public
export const loginUser = expressAsyncHandler( async(req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password ) {
    res.json({
      message: "اطلاعات مورد نطر را وارد کنید",
      statusCode: 200,
      isSuccess: false
    });
    return
  }
  
  const userAvailable = await userModel.findOne({ phoneNumber });
 
  if (userAvailable && bcrypt.compare(password, userAvailable?.password)) {
    
   
      const userDataResponse = {
        username: userAvailable?.username,
        phoneNumber,
        role:userAvailable?.role,
      }
      res.status(200).json(SuccesResponse(userDataResponse));
      return
    
  
    
  } else {
    res.status(200);
    res.json({
       message: "شماره تلفن یا رمز عبور صحیح نمی باشد ",
       statusCode: 200,
       isSuccess: false
     });
     return
  }
});

