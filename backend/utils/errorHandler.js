// writing this code to reduse the number of line in controller file 
// this file reduse the if else statement 
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports=ErrorHandler;