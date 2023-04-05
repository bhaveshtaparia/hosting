const ErrorHandler=require('../utils/errorHandler');
// exporting this file to app.js so we donot need to export it at any other files
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode ||500;
    err.message=err.message ||"External server err";
    
    
    // wrong mongodb id error--> to handle that err
    if(err.name==='CastError'){
        const message='Resourse not found. invalid : '+err.path;
        err=new ErrorHandler(message,400);
    } 
    
    // mongoose duplicate key error 
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    }
    // wrong jwt error
    if(err.name==='jsonWebTokenError'){
        const message='Json Web Token is Invalid, try again ';
        err=new ErrorHandler(message,400);
    } 
    
    // jwt Expire error
    if(err.name==='TokenExpiredError'){
        const message='Json Web Token is Expired, try again ';
        err=new ErrorHandler(message,400);

    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    });
}