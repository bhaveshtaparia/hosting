// imporing the product model
const Product=require('../models/productmodel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError=require('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/ApiFeatures');
const cloudinary=require('cloudinary')
//export to route
//this is an arrow function  to save data of product for post request
// this is for a admin 
exports.createProduct=catchAsyncError(async(req,res,next)=>{
  let images=[];
  if(typeof(req.body.images)==="string"){
images.push(req.body.images);
  }else{
images=req.body.images;
  }
  const imagesLink=[];
  for(let i=0;i<images.length;i++){
    const result=await cloudinary.v2.uploader.upload(images[i],{folder:"products"});
    imagesLink.push({
      public_id:result.public_id,
      url:result.secure_url
    })
  }
  req.body.images=imagesLink;
  req.body.user=req.user.id;
  const product=await Product.create(req.body);
  // for post request we use 201 status code
  res.status(201).json({
      success:true,
      product
  })
})


//  this is an arrow function for get request
//export to routes
exports.getAllproducts=catchAsyncError(async(req,res)=>{
    // for get request we use 200 status code
    // ApiFeature class have search function which was returning same class

    const resultPerPage=8;
    const productCount=await Product.countDocuments();
    
    let ApiFeature=new ApiFeatures(Product.find(),req.query).search().filter();
    // Apifeature.query simply means -->Product.find()  
    let product=await ApiFeature.query;
    let filteredProductCount=product.length;
    ApiFeature=ApiFeature.pagination(resultPerPage)
    product=await ApiFeature.query.clone();
    res.status(200).json({ 
        success:true,
        product,
        productCount,
        resultPerPage,
      filteredProductCount});
})

// get all product admin
exports.getAdminproducts=catchAsyncError(async(req,res)=>{
 const products=await Product.find();
    res.status(200).json({ 
        success:true,
        products});
})


// get product details --->

exports.getProductDetails=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
     return next(new ErrorHandler("product not found",404));  
    }else{
      res.status(200).json({
          success:true,
        product
      })
    }
  })

// for update the product details-->only for admine
exports.updateproduct=catchAsyncError(async(req,res,next)=>{
    // Product-->this is a model name not to be confused 
    let product=await Product.findById(req.params.id);
    if(!product){
      return next(new ErrorHandler("product not found",404));  
     
    }else{
      let images=[];
      if(typeof(req.body.images)==="string"){
    images.push(req.body.images);
      }else{
    images=req.body.images;
      }
      if(images!==undefined){
        for(let i=0;i<product.images.length;i++){
          await cloudinary.v2.uploader.destroy(product.images[i].public_id)
            }
            const imagesLink=[];
            for(let i=0;i<images.length;i++){
              const result=await cloudinary.v2.uploader.upload(images[i],{folder:"products"});
              imagesLink.push({
                public_id:result.public_id,
                url:result.secure_url
              })
            }
            req.body.images=imagesLink;
      }
   
        product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success:true,
            product
        })
    }
    })
    
    // for delete the product 
    exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
      const product=await Product.findById(req.params.id);
      if(!product){
        return next(new ErrorHandler("product not found",404));   
      }

      // deleting images from cloudinary
      for(let i=0;i<product.images.length;i++){
    await cloudinary.v2.uploader.destroy(product.images[i].public_id)
      }
           await product.remove()
        res.status(200).json({
            success:true,
            message:"product deleted successfully"
        })
      
    })

    // create new review or update review

exports.createProductReviews=catchAsyncError(async(req,res,next)=>{
  const {rating,comment,productId}=req.body;
  const review={
      user:req.user._id,
      name:req.user.name,
      rating:Number(rating),
      comment
  }
  const product=await Product.findById(productId);
  if(!product){
      return next(new ErrorHandler("something went wrong ,try after some time ",404));
  }
  const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())
  if(isReviewed){
       product.reviews.forEach(rev=>{
          if(rev.user.toString()===req.user._id.toString())
          rev.rating=rating;
          rev.comment=comment
       })
  }else{
      product.reviews.push(review);
      product.numOfReviews=product.reviews.length;
  }

  let avg=0;
 product.reviews.forEach(rev=>{
      avg+=rev.rating;
  })
  product.ratings=avg/product.reviews.length;
  await product.save({validateBeforeSave:false});
  res.status(200).json({
      success:true
  })
})


//get all reviews of a product 

exports.getProductReviews=catchAsyncError(async(req,res,next)=>{
  const product=await Product.findById(req.query.id)
  if(!product){
    return next(new ErrorHandler("product not found ",404));
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews
})
})
// delete reviews 

/// there are some err on this code late to be check 
exports.deleteReviews=catchAsyncError(async(req,res,next)=>{
  const product=await Product.findById(req.query.productId)
  if(!product){
    return next(new ErrorHandler("product not found ",404));
  }
  const id=req.query.id.toString();
  const reviews= product.reviews.filter(r=>r._id.toString()!==id);
 
  let avg=0;
 reviews.forEach(rev=>{
      avg+=rev.rating;
  })
  let ratings=0;
  if(reviews.length!==0){
    ratings=avg/reviews.length;
  }
  const numOfReviews=reviews.length

  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews
  },{
    new :true,
    runValidators:true,
    useFindAndModify:false
  })


  res.status(200).json({
    success:true,
})
})