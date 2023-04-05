// handling async error 
// redusing number of line of code in controller without writing a try and catch
module.exports=thefunc=>(req,res,next)=>{
    Promise.resolve(thefunc(req,res,next)).catch(next);
}