import expressAsyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import userModel from "../model/userModel.js";
import * as bcrypt from 'bcrypt'


//@desc login to Mobile
//@route POST /api/register
//@access public
export const registerUser = expressAsyncHandler(async (req, res) => {
  debugger
  const { username, password , phoneNumber } = req.body;
  
  if (!username || !password) {
    res.status(400);
    throw new errorHandler("Please fill out all");
  }

  const userAvailable = await userModel.findOne({ username });
  const userAvailablePhoneNumber = await userModel.findOne({ phoneNumber });
  if (userAvailable) {
    res.status(400);
    throw new errorHandler("user is already register");
  }
  if (userAvailablePhoneNumber) {
    res.status(400);
    throw new errorHandler("your phonNumber already register");
  }
  const hashPassword = await bcrypt.hash(password, 8);

  const user = await userModel.create({
    username,
    password: hashPassword,
    phoneNumber,
    role:"user",
  });
  res.status(200).json(user);
});

//@desc Login user
//@route POST  /api/user/login
//@access public
export const loginUser = (req, res) => {
  const { username , password } = req.body;
  const userAvailable = userModel.findOne({ username });
  if (userAvailable && bcrypt.compare(password, userAvailable.password)) {
    res.status(200).json({ username: username});
  } else {
    res.status(401);
    throw new errorHandler("username or Password is Not Valid");
  }
};
