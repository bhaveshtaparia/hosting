import React, { useEffect, useState } from 'react'
import './Products.css'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors,getProduct } from '../../actions/productAction'
import Product from '../Home/Product'
import Loder from '../loder/Loder'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from '@material-ui/core/Slider'
// import Slider from '@matarial-ui/core/Slider'
import { Typography } from '@material-ui/core'
import {useAlert} from 'react-alert'
import MetaData from '../MetaData'


export default function Products() {
  const alert =useAlert();
  const categories=[
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "Earbuds"
  ];

  const dispatch=useDispatch();

  const [currentpage,setCurrentPage]=useState(1);
  const {products,loading,error,productsCount,resultPerPage,filteredProductCount}=useSelector((state)=>state.products)
  const [price,setPrice]=useState([0,25000])
  const [category,setCategory]=useState("");
  const [ratings,setRatings]=useState(0)
   const params =useParams();
  const keyword=params.keyword;
let count=filteredProductCount;
  const setCurrentPageNo=(e)=>{
    setCurrentPage(e);
  }

   const priceHandler=(event,newPrice)=>{
setPrice(newPrice);
   }


    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearErrors);
      }
dispatch(getProduct(keyword,currentpage,price,category,ratings))
  },[dispatch,keyword,currentpage,price,category,ratings,error,alert ])
    return (
    <>
    {loading?<Loder/>:<>
  <MetaData title="PRODUCTS---ECOMMERCE"/>
    <h2 className='productsHeading'>Products</h2>
    <div className='products'>
         {products && products.map(product=>(
      <Product key={product._id} product={product}/>
     ))}
    </div>

<div className='filterBox'>

  <Typography>Price</Typography>
  <Slider
  value={price}
  onChange={priceHandler}
  valueLabelDisplay="auto"
  aria-labelledby='range-slider'
  min={0}
  max={25000}
  />
<Typography>Categories</Typography>

  <ul className='categoryBox'>
    {categories.map((category)=>(
      <li className=' category-link' key={category}
      onClick={()=>setCategory(category)}
      >
        {category}
        </li>
    ))}
  </ul>
<fieldset>
  <Typography component="legend" >Ratings Above</Typography>
  <Slider value={ratings} onChange={(e,newRating)=>{
    setRatings(newRating);
  }}
  area-labelledby='continuous-slider'
valueLabelDisplay='auto'
  min={0}
  max={5}
  />
</fieldset>

    </div>


    {  resultPerPage <count &&(
   <div className='paginationBox'>
   <Pagination
   activePage={currentpage}
   itemsCountPerPage={resultPerPage}
   totalItemsCount={productsCount}
   onChange={setCurrentPageNo}
   nextPageText="Next"
   prevPageText="Prev"
   firstPageText="1st"
   lastPageText="Last"
   itemClass='page-item'
   linkClass='page-link'
   activeClass='pageItemActive'
   activeLinkClass='pageLinkActive'
   />
       </div>
      
    )}
 
    </>}
    </>
  )
}
