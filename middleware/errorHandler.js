const { constants } = require('../constants');
const errorHandler=(err,req,res,next)=>{
  const statusCode = res.statusCode >= 400 ? res.statusCode : constants.SERVER_ERROR;
  res.status(statusCode).json({
    title: statusCode >= 500 ? "Server Error" : "Request Failed",
    message: err.message || "An unexpected error occurred",
  });
};
module.exports=errorHandler; 
