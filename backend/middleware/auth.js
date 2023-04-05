
const catchAsyncError=require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const jwt=require('jsonwebtoken');
const User= require('../models/userModel');
exports.isAuthenticcatedUser=catchAsyncError(async(req,res,next)=>{
    const {token} =await req.cookies;
    // console.log(token);
    if(!token){
        return next(new ErrorHandler("Please Login to Excess this Resource ",401));
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decodedData.id);
    next();
});
// ...roles this is an array which have data admine 
exports.authorizeRole=(...roles)=>{
return  (req,res,next)=>{
if(!roles.includes(req.user.role)){
    return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resouce`)
,403)}
next();
}
}
