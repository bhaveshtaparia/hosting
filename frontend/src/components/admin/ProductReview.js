import React, { useEffect, useState } from 'react'
import {DataGrid} from '@material-ui/data-grid'
import './ProductReview.css'
import { useSelector,useDispatch } from 'react-redux'
import { getAllReviews,deleteReviews,clearErrors } from '../../actions/productAction'
import {  useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../MetaData'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar  from './Sidebar'
import {  DELETE_REVIEW_RESET } from '../../constants/productConstants'
import StarIcon from '@material-ui/icons/Star'
export default function ProductReview() {
    const dispatch =useDispatch();
    const alert =useAlert();
    const {error:deleteError,isDeleted}=useSelector((state)=>state.review)
    const {error,reviews,loading}=useSelector(state=>state.productReview)
    const [productId,setProductId]=useState();
    const deleteReviewHandler=(reviewId)=>{
        dispatch(deleteReviews(reviewId,productId));
    }
    const productReviewsSubmitHandler=(e)=>{
e.preventDefault();
dispatch(getAllReviews(productId));
    }
    const Navigate =useNavigate();
    useEffect(()=>{
     
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Review Deleted Successfully");
            Navigate('/admin/reviews');
            dispatch({type:DELETE_REVIEW_RESET});
        }
     
    },[dispatch,alert,error,Navigate,deleteError,isDeleted,productId]);
    const columns=[
        {field:"id",headerName:"Reviews Id",minWidth:200,flex:0.4},
        {field:"user",headerName:"User",minWidth:150,flex:0.3},
        {field:"comment",headerName:"Comment",minWidth:300,flex:0.5},
        {field:"rating",headerName:"Rating",type:"number",minWidth:120,flex:0.3},
        {field:"actions",headerName:"Actions",type:"number",minWidth:100,flex:0.3,sortable:false,
    renderCell:(params)=>{
        return (
            <>
           
            <Button onClick={()=>deleteReviewHandler(params.getValue(params.id,"id"))}><DeleteIcon/></Button>
            </>
        )
    }},
    ]
    const rows=[];
    reviews && reviews.forEach(item => {
        rows.push({
            id:item._id,
            user:item.name,
            comment:item.comment,
            rating:item.rating
        })
    });
  return (
   <>
   <MetaData title={`All-Reviews--Admin`}/>
   <div className='dashboard'>
    <Sidebar/>
    <div className='productReviewsContainer'>
    <form className='productReviewsForm' onSubmit={productReviewsSubmitHandler}>
    <h1 className='productReviewsFormHeading'>All Reviews</h1>
    <div>
        <StarIcon/>
        <input type='text' placeholder='Product Id' required value={productId} onChange={(e)=>setProductId(e.target.value)}/>
    </div>
   
    
   

 
   
<Button
  id="createProductBtn"
  type="submit" disabled={loading?true:false ||productId===""?true:false}>  
Search
</Button>
</form>
 {reviews && reviews.length>0?
    <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productsListTable'/>:<h1 className='productReviewsFormHeading'>No Review Found</h1>}
    </div>
   </div>
   </>
  )
}
