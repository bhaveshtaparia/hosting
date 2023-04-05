import React from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import MetaData from '../MetaData'
import { Link, useNavigate } from 'react-router-dom'
import './ConfirmOrder.css'
import { Typography } from '@material-ui/core'
export default function ConfirmOrder() {
    const {shippingInfo,cartItems}=useSelector((state)=>state.cart);
    const {user}=useSelector((state)=>state.user)
    
    const subtotal=cartItems.reduce(
        (acc,item)=>acc+item.quantity*item.price,0
    );
    const shippingCharges=subtotal>1000?0:200;
    const tax=subtotal*18/100;
    const totalPrice=subtotal+tax+shippingCharges
    const address=`${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},
    ${shippingInfo.pincode},${shippingInfo.country}`
const Navigate=useNavigate();
    const proceedToPayment=()=>{
        const data={
        subtotal,
        shippingCharges,
        tax,
        totalPrice
        };
    sessionStorage.setItem("orderInfo",JSON.stringify(data));
    Navigate('/process/payment')
    }



  return (
    <>
    <MetaData title="Confirm Order"/>
    <CheckoutSteps activeSteps={1}/>
    <div className='confirmOrderPage'>
        <div>
            <div className='confirmShippingArea'>
                <Typography>Shipping Info</Typography>
<div className='confirmShippingAreaBox'>
    <div>
        <p>Name:</p>
        <span>{user.name}</span>
    </div>
    <div>
        <p>Phone:</p>
         <span>{shippingInfo.phoneNo}</span>
    </div>
    <div>
        <p>Address</p>
        <span>{address}</span>
    </div>
</div>
            </div>
<div className='confirmCartItems'>
    <Typography>Your Cart Items:</Typography>
    <div className='confirmCartItemContainer'>
        {cartItems && cartItems.map((item)=>(
<div key={item.product}>
<img src={item.image} alt="product"/>
<Link to={`{/product/${item.product}}`}>{item.name}</Link>
<span>
    {item.quantity} X {item.price}=
    <b>Rs {item.price*item.quantity}</b>
</span>
</div>



        ))}
    </div>
</div>
        </div>


        <div>
<div className='orderSummary'>
    <Typography>Order Summary</Typography>
    <div>
        <div>
            <p>Subtotal:</p>
            <span>RS {subtotal}</span>
        </div>
        <div>
            <p>Shipping charges</p>
            <span>Rs {shippingCharges}</span>
        </div>
            <div>
                <p>Gst</p>
                <span>RS {tax} </span>
            </div>
    </div>
    <div className='orderSummaryTotal'>
        <p>
            <b>Total</b>
        </p>
        <span>Rs {totalPrice}</span>
    </div>
    <button onClick={proceedToPayment}>Proceed To Payment</button>
</div>

        </div>
    </div>
    </>
  )
}
