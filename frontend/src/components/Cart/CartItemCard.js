import React from 'react'
import './CartItemCard.css'
import { Link } from 'react-router-dom'
export default function CartItemCard({item,deleteCartItem}) {
  return (
    <div className='CartItemCard'>
        <img src={item.image} alt="images_"/>
        <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`price: RS ${item.price}`}</span>
            <p onClick={()=>deleteCartItem(item.product)}>Remove</p>
        </div>
    </div>
  )
}
