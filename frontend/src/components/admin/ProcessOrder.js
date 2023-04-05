import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar.js'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../MetaData'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import { getOrderDetails,clearErrors, updateOrder } from '../../actions/orderAction.js'
import { useAlert } from 'react-alert'
import Loder from '../loder/Loder.js'
import AccountTreeIcon from '@material-ui/icons/AccountTree'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants.js'
import './processOrder.css'
export default function ProcessOrder() {
    
    const {order,error,loading}=useSelector((state)=>state.orderDetails)
    const {error:updateError,isUpdated}=useSelector((state)=>state.order)
    const params=useParams();
    const dispatch=useDispatch();
    const alert=useAlert();
    const updateOrderSubmitHandler=(e)=>{
        e.preventDefault();
        const myform =new FormData();
        myform.set("status",status);
        dispatch(updateOrder(params.id,myform));
    };
  
    
    const [status,setStatus]=useState("");
    useEffect(()=>{
       
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
       
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Order Updated Successfully")
            dispatch({type:UPDATE_ORDER_RESET});
        }
        dispatch(getOrderDetails(params.id))
    },[dispatch,alert,error,params,params.id,isUpdated,updateError])
  
     



  return (
    <>
    <MetaData title="Process Order"/>
    <div className='dashboard'>
<Sidebar/>
<div className='newProductContainer'>
 {loading?<Loder/>:
<div className='confirmOrderPage' style={{display:order.orderStatus==="Delivered"?"block":"grid"}}>
        <div>
            <div className='confirmShippingArea'>
                <Typography>Shipping Info</Typography>
                <div className='orderDetailsContainerBox'>
             <div>
                <p>Name:</p>
                <span>{order.user && order.user.name}</span>
             </div>
             <div>
                <p>Phone:</p>
                <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                </span>
             </div>
             <div>
                <p>Address</p>
                <span>
                    {order.shippingInfo && `${order.shippingInfo.address} ,${order.shippingInfo.city},
                    ${order.shippingInfo.state},${order.shippingInfo.pincode},${order.shippingInfo.country}`}
                </span>
             </div>
</div>
<Typography>Payment</Typography>
            <div className='orderDetailsContainerBox'>
                <div>
                    <p className={order.paymentInfo && order.paymentInfo.status==="succeeded"?"GreenColor":"RedColor"}>
                    {order.paymentInfo && order.paymentInfo.status==="succeeded"?"Paid":"Not Paid"}
                    </p>
                </div>
                <div>
                    <p>Amount</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                </div>
            </div>
            <Typography>Order Status</Typography>
            <div className='orderDetailsContainerBox'>
                <div>
                    <p className={order.orderStatus && order.orderStatus==="Delivered"?"GreenColor":"RedColor"}
                    >{order.orderStatus && order.orderStatus}</p>
                </div>
            </div>
            </div>
<div className='confirmCartItems'>
    <Typography>Your Cart Items:</Typography>
    <div className='confirmCartItemContainer'>
        {order.orderItem && order.orderItem.map((item)=>(
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


        <div
        style={{display:[order.orderStatus==="Delivered"?"none":"block"]}}>
        <form className='updateOrderForm' onSubmit={updateOrderSubmitHandler}>
    <h1>Process Order</h1>
 
   
    <div>
        <AccountTreeIcon/>
        <select onChange={(e)=>setStatus(e.target.value)}>
            <option value="">Choose Category</option>
            {order.orderStatus==="processing" &&
            (<option value="Shipped">Shipped</option>)}
            {order.orderStatus==="Shipped" &&
            (<option value="Delivered">Delivered</option>)}
            
            
            
        </select>
       
    </div>
    
<Button

  id="createProductBtn"
  type="submit" disabled={loading?true:false || status===""?true:false}>  
Process
</Button>
</form>

        </div>
    </div>
}
</div>
    </div>
    </>
  )
}
