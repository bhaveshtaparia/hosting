const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError=require('../middleware/catchAsyncError');
const User=require('../models/userModel');
const sendToken=require('../utils/jwtTokens');
const sendEmail=require('../utils/sendEmail');
const cloudinary=require('cloudinary');


//404-->not found
//400-->bad request
//401-->authentication
//500->internal server error
//200-->ok
// 201-->created
//100-->The HTTP 100 Continue informational status response code
// register a user
exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const {name,email,password,avatar}=req.body;
    // console.log(name,avatar);

    const myCloud=await cloudinary.v2.uploader.upload(avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    }) 
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    })
    sendToken(user,201,res);
}
)

// login user
exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }
    // we need to select password again because in schema select was selected false
    const user=await User.findOne({email}).select("password");
    if(!user){
        return next(new ErrorHandler("Invalid Email and Password",401));
    }
    // console.log(user);
    const isPasswordMatched=await user.ComparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email and Password",401));

    }
    sendToken(user,200,res);
})


// logout user


exports.logoutUser=catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success: true,
        message:"Logged out"
    })
})


// forgot password 
exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User Not Found ",404));
    }
    const resetToken =user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message=`Your Password Reset Token is :-\n \n ${resetPasswordUrl} \n \n if
    you not requested this email then ,please ignore it`;
    try{
        await  sendEmail({
        email:user.email,
        subject:`Ecommerce Password Recovery `,
        message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })

    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500));
    }

})


// reset password  --->
exports.resetPassword=catchAsyncError(async(req,res,next)=>{
    // creating token hash
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has benn expired ",400));
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not Match",400));
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save();
        sendToken(user,200,res);
})

// Get User Details --->
exports.getUserDetails=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
     res.status(200).json({
        success:true,
        user
     })
})


/// update User Password -->
exports.updatePassword=catchAsyncError(async(req,res,next)=>{
    const user =await User.findById(req.user.id).select("password");
    const isPasswordMatched=await user.ComparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("old password was incorrect",401));
        
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",401));
    }
    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
})

// update user profile-->



exports.updateUserProfile=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    };
    // there is some error check later on 

    if(req.body.avatar.length!==9){
        const user=await User.findById(req.user.id);
        const imageId=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId)
        
        const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale",
        }) 
    
        newUserData.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    
    }
        const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true
    })
})



/// get all users-->(admin)

exports.getAllUser=catchAsyncError(async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users
    })
})

// get single user(admin)

exports.getSingleUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`user not exists at that id: ${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user
    })
})

// update user role----->admin

exports.updateUserRole=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    // let user=User.findById(req.params.id);
    // if(!user){
    //     return next(new ErrorHandler(`User doesNot Exist with id:- ${req.params.id}`,400))
    // }
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true
    })
})
//Delete User-->admin
exports.deleteUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`user does not exists with id: ${req.params.id}`))
    }
    const imageId=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId)
    await user.remove();
    res.status(200).json({
        success:true,
        message:"User Deleted successfully"
    })
})

