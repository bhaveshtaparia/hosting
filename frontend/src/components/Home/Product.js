import React from 'react'
import {Link} from 'react-router-dom'
// import shirt from '../../Images/shirt.jpg'
// import ReactStars from 'react-rating-stars-component'
import { Rating } from '@material-ui/lab'
export default function Product({product}) {
  const options={
  
    value:product.ratings,
     size:"large",
    readOnly:true,
    precision:0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
     <img src={product.images[0].url} alt={product.name}/>
     {/* <img src={shirt} alt={product.name} key={product.name}/> */}
    <p>{product.name}</p>
    <div>
        <Rating {...options}/><span>{product.numOfReviews} Reviews </span>
    </div>
    <span>{`Rs${product.price}`}</span>
    </Link>
    
  )
}
