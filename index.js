import express from "express"
import {config} from "dotenv"
import connectDb from "./config/dbConnection.js"
import cors from "cors"
import { loginRoutes } from "./router/loginRouter.js"
import errorHandler from "./middleware/errorHandler.js"
import { usersRoutes } from "./router/userRouter.js"
import { blogRoutes } from "./router/blogRouter.js"
import { UserAddressRoutes } from "./router/userAddressRouter.js"
import { brandRoutes } from "./router/brandRouter.js"
import { productRoutes } from "./router/productRouter.js"
import { mainBannerRoutes, modelBannerRoutes, offerBannerRoutes } from "./router/bannerRouter.js"
import { categoryRoutes, stepRoutes } from "./router/categoryStepRouter.js"
import { quetionRoutes } from "./router/questionRouter.js"
import { productSectionRoutes, sectionRoutes } from "./router/sectionRouter.js"
import { checkPythonDependencies, installPythonDependencies } from "./pythonDependencyInstaller.js"

config()
connectDb()
const app = express()

//Middleware
app.use(cors())
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({extended:true}))



//Routes
app.use("/api/register", loginRoutes);
app.use("/api/", usersRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/address", UserAddressRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/product", productRoutes);
app.use("/api/mainBanner", mainBannerRoutes);
app.use("/api/offerBanner", offerBannerRoutes);
app.use("/api/modelBanner", modelBannerRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/step", stepRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/productSection", productSectionRoutes);

app.use(errorHandler);

//Check and install Python dependencies if needed
if (!checkPythonDependencies()) {
    installPythonDependencies();
}

app.listen(process.env.PORT , () => {
    console.log("server Running");
})