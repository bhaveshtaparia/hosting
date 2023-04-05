import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
// import ReactStars from 'react-rating-stars-component'
import {useDispatch,useSelector} from 'react-redux'
import {clearErrors, getProductDetails, newReview} from '../../actions/productAction'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import shirt from '../../Images/shirt.jpg'
import Loder from '../loder/Loder'
import ReviewCard from './ReviewCard.js'
import  {useAlert} from "react-alert"
import MetaData from '../MetaData'
import {addItemToCart} from '../../actions/cartAction'
import {Dialog,DialogActions,DialogContent,DialogTitle,Button} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

export default function ProductDetails() {
 
  const dispatch=useDispatch();
  const alert=useAlert();
 const {id}=useParams();
 const [open,setOpen]=useState("");
 const [rating,setRating]=useState("");
 const [comment,setComment]=useState("");
 const {products,loading,error}=useSelector(state=>state.productDetails);
 const {success,error :reviewError}=useSelector((state)=>state.newReview)
 const options={
  
  value:products.ratings,
 
  size:"large",
  readOnly:true,
  precision:0.5,
};

const [quantity,setQuantinty]=useState(1);
const increaseQuantity=()=>{
  if(products.stock<=quantity){
    return;
  }
  const qty=quantity+1;
  setQuantinty(qty);
}
const decreaseQuantity=()=>{
  if(1>=quantity){
    return;
  }
  const qty=quantity-1;
  setQuantinty(qty);

}

const addToCartHandler=()=>{
  dispatch(addItemToCart(id,quantity));
  alert.success("Item Added TO Cart")
}
 const submitReviewToggle=()=>{
  open?setOpen(false):setOpen(true);
 }
 const params=useParams();
 const reviewSubmitHeandler=()=>{
  const myForm=new FormData();
  myForm.set("rating",rating);
  myForm.set("comment",comment);
  myForm.set("productId",params.id);
  dispatch(newReview(myForm))
  setOpen(false);
 }
 useEffect(()=>{
  if(error){
   alert.error(error)
   dispatch(clearErrors())
  }
  if(reviewError){
   alert.error(reviewError)
   dispatch(clearErrors())
  }
  if(success){
    alert.success("Review Submitted Successfully")
    dispatch({type:NEW_REVIEW_RESET})
  }
  dispatch(getProductDetails(id));
 },[dispatch,id,error,alert,reviewError,success]);
  return (
    <>
    {loading?<Loder/>:
   <>
   
     <MetaData title={`${products.name}--ECOMMERCE`}/>
   <div className='productDetails'>
  
<div>

<Carousel>
 {products.images && products.images.map((item,i)=>(
   <img className='carousel' key ={item.url} src={item.url} alt={`${i}Slide`} />
  ))} 
{/* <img className='carousel' key ={shirt} src={shirt} alt={"images"} /> */}
</Carousel>
  </div>
<div>
  <div className='detailsBlock-1'>

  <h2>{products.name}</h2>
  <p>Product #{products._id}</p>
  </div>
  <div className='detailsBlock-2'>
   <Rating {...options}/>
   <span>{products.numOfReviews} Reviews</span>
  </div>
  <div className='detailsBlock-3'>
   <h1>{products.price} Rs</h1>
   <div className='detailsBlock-3-1'>
   <div className='detailsBlock-3-1-1'>
    <button onClick={decreaseQuantity}>-</button>
    <input readOnly value={quantity} type="number"/>
    <button onClick={increaseQuantity}>+</button>
   </div>
   <button disabled={products.stock<1?true:false} onClick={addToCartHandler}>Add To Cart</button>
   </div>
   <p>
    Status:
    <b className={products.stock<1?"RedColor":"GreenColor"}>
      {products.stock<1?"OutOfStock":"inStock"}
    </b>
   </p>
  </div>

  <div className='detailsBlock-4'>
  Description: <p>{products.description}</p>
  </div>
  <button  onClick={submitReviewToggle} className='submitReviews'>
  Submit Reviews
  </button>
</div>
  </div>
<h3 className='reviewsHeading'>Reviews</h3>

<Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
<DialogTitle>Submit Review</DialogTitle>
<DialogContent className='submitDialog'>
  <Rating onChange={(e)=>setRating(e.target.value)}
  value={rating}
  size="large"/>
  <textarea className='submitDialogTextArea' cols="30" rows="5" value={comment} 
  onChange={(e)=>setComment(e.target.value)}></textarea>

</DialogContent>
<DialogActions>
  <Button onClick={submitReviewToggle} color="secondary">Cancle</Button>
  <Button onClick={reviewSubmitHeandler} color='primary'>Submit</Button>
</DialogActions>
</Dialog>
{products.reviews && products.reviews[0]?(
  <div className='reviews'>
  {products.reviews && products.reviews.map((review)=>
    <ReviewCard review={review}/>
    )}
</div>
):( 
  <p className='noReviews'>No Reviews Yet</p>
  )}

  </>
}
   </>
  )
}
