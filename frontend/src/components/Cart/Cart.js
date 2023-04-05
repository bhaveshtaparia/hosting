import React from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard.js'
import {useSelector,useDispatch} from 'react-redux'
import {addItemToCart, removeItemFromCart} from '../../actions/cartAction'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import { Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../MetaData'
import { useAlert } from 'react-alert'
export default function Cart() {
    const Navigate=useNavigate();
    const dispatch=useDispatch();
    const alert=useAlert();
    const {cartItems}=useSelector((state)=>state.cart)
    const checkOutHandler=()=>{
        
        Navigate('/login?redirect=shipping')
    }
    const increaseQuantity=(id,quantity,stock)=>{
        const newQty=quantity+1;
        if(stock<=quantity){
            return;
        }
        dispatch(addItemToCart(id,newQty))
    }
    const decreaseQuantity=(id,quantity)=>{
        const newQty=quantity-1;
        if(quantity<=1){
            return;
        }
        dispatch(addItemToCart(id,newQty))
    }
    const deleteCartItem=(id)=>{
        dispatch(removeItemFromCart(id))
    }
    
  return (
    <>
    <MetaData title={"Ecommerce--Cart"}/>
    {cartItems.length===0?
    <div className='emptyCart'>
        <RemoveShoppingCartIcon/>
        <Typography>No Product In Your Cart</Typography>
        <Link to='/products'>View Products</Link>
    </div>
    :
     <>
     <div className='cartPage'>
      <div className='cartHeader'>
          <p>Product</p>
          <p>Quantity</p>
          <p>Subtotal</p>
      </div>
    {cartItems && cartItems.map((item)=>(
       <div className='cartContainer' key={item.product}>
       <CartItemCard item={item} deleteCartItem={deleteCartItem}/>
       <div className='cartInput'>
           <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
           <input readOnly value={item.quantity} type="number"/>
           <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
       </div>
       <p className='cartSubtotal'>{`RS ${item.price*(item.quantity>item.stock?deleteCartItem(item.product):item.quantity)}`}</p>
      </div>
    ))}
     <div className='cartGrossTotal'>
      <div></div>
      <div className='cartGrossTotalBox'>
          <p>Gross Total</p>
          <p>{`RS ${cartItems.reduce(
          
            (acc,item)=>acc+(item.quantity>item.stock?item.stock:item.quantity)*item.price,0
          )}`}</p>
      </div>
      <div></div>
      <div className='checkOutBtn'>
          <button onClick={checkOutHandler}>Check Out</button>
      </div>
     </div>
     </div>
     </>}
    </>
  
  )
}
