const express =require('express');
const app=express();
const cookieParser=require('cookie-parser');
const errorMiddleware=require('./middleware/error');
const bodyParser=require('body-parser')
const fileupload=require('express-fileupload')
const path=require('path');
if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:'backend/config/config.env'});
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());
app.use(express.json());
app.use(cookieParser());
//route import
const products=require('./routes/productR')
// using router to make a code readable instead of app.get() 
const users=require('./routes/userR');
const orders=require('./routes/orderR');
const payment=require('./routes/paymentR');
app.use('/api/v1',products);
app.use('/api/v1',users);
app.use('/api/v1',orders);
app.use('/api/v1',payment)
//middleware for error
app.use(errorMiddleware);
app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))

})

module.exports=app;