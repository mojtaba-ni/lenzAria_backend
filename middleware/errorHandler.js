import { constans } from "../public/constans.js";

const errorHandler = (data, req, res, ) => {
 

  console.log({data});
  const statusCode = res.statuseCode ? res.statusCode : 500;
  switch (statusCode) {
    case constans.NOT_FOUND:
      res.json({
        title: "Not Found",
        // message: err.message,
        // stackTrace: err.stack,
      });
      break;
    case constans.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        // message: err.message,
        // stackTrace: err.stack,
      });
      break;
    case constans.FORBIDDEN:
      res.json({
        title: "Forbidden",
        // message: err.message,
        // stackTrace: err.stack,
      });
      break;
    case constans.SERVER_ERROR:
      res.json({
        title: "Server Error",
        // message: err.message,
        // stackTrace: err.stack,
      });
      break;
    default:
        console.log("No Error, All good");
      break;
  }
};

export default errorHandler;
