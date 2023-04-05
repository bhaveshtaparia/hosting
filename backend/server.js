// starting server here
const app= require('./app');
const cloudinary =require('cloudinary');
//handling uncaught Exception->like we will write console.log(hello) this will give you error that hello is not defined
//
process.on('uncaughtException',(err)=>{
    console.log(`Error ${err.message}`);
    console.log("shutting down the server due to uncaught Exception ");
        process.exit(1);
})
const databaseConnection=require('./config/database');
// this line help us to read a env variable
if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:'backend/config/config.env'});
}

// when we will write nodemon server.js then this will work
// dotenv.config({path:'./config/config.env'});
databaseConnection();

/// cloundinary help to work with cloudniary 
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

}) 
const port=process.env.PORT;
const server=app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})


// unhandle promise rejection 
// when our server was not started properly like connection was not stablice with database 
// so we have to close server properly
process.on('unhandledRejection',err=>{
    console.log(`Error ${err.message}`);
    console.log("shutting down the server due to unhandled promise rejection ");
    server.close(()=>{
        process.exit(1);
    });
})