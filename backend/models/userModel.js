const mongoose =require('mongoose');
const validator =require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
/// generating random token use of crypto module
const crypto=require('crypto');
const userSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,'Please Enter Your Name'],
    maxLenght:[30,'Name Cannot Exceed 30 Characters'],
    minLength:[4,'Name Must Contain Atleast 4 Characters']
},
email:{
    type:String,
    required:[true,'please Enter Your Email'],
    unique:true,
    validate:[validator.isEmail,"Please Enter a Vaid Email"],
},
password:{
    type:String,
    required:[true,'please Enter Your Password'],
    minLength:[7,'Password Must Contain Atleast 7 Characters'],
    // its means when we call the find function it will not give the data of password of user 
    select:false
},
avatar:{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
},
role:{
    type:String,
    default:"user"
},
createdAt:{
type:Date,
default:Date.now,
},
resetPasswordToken:String,
resetPasswordExpire:Date,

})

// now we give the code for user password safety
// we are using async function not a arrow function because this keyword not work in arrow function 
userSchema.pre("save",async function(next){
     if(!this.isModified("password")){
        next();
     }
    this.password=await bcrypt.hash(this.password,10);
})

// json web token (jwt)
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
// compare password 

userSchema.methods.ComparePassword=async function(enteredPassword){
return( await bcrypt.compare(enteredPassword,this.password));
}

// generating password reset token 
userSchema.methods.getResetPasswordToken=function(){
 
    // generating Token
    const resetToken=crypto.randomBytes(20).toString('hex');

    //hashing  and adding password to user Schema
    this.resetPasswordExpire=Date.now()*15*60*1000;
    return resetToken;
     
}

module.exports=new mongoose.model('user',userSchema);
