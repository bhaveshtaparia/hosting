import React, { useState } from 'react'
import './Header.css'
import {SpeedDial,SpeedDialAction} from '@material-ui/lab'
import profile from '../../Images/profile.png'
import { Backdrop } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
export default function UserOptions({user}) {
  const {cartItems}=useSelector((state)=>state.cart);
  const alert =useAlert();
  const dispatch=useDispatch();
  const Navigate=useNavigate();

  const options=[
    {icon:<ListAltIcon/>,name:"Orders",func:orders},
    {icon:<PersonIcon/>,name:"Account",func:account},
    {icon:<ShoppingCartIcon style={{color:cartItems.length>0?"yellow":"unset"}}/>,name:`Cart(${cartItems.length})`,func:cart},
    {icon:<ExitToAppIcon/>,name:"Logout",func:logoutUser},
  ]
  if(user.role==='admin'){
    options.unshift({icon:<DashboardIcon/>,name:"Dashboard" ,func:dashboard})
  }
  function dashboard(){
    Navigate('/admin/dashboard')
  }
  function orders(){
    Navigate('/orders')
  }
  function account(){
    Navigate('/account')
  }
  function cart(){
    Navigate('/cart')
  }
  function logoutUser(){
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  const [open,setOpen]=useState(false)
    return (
    <>
    <Backdrop open={open} style={{zIndex:"10"}}/>
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      onClose={()=>setOpen(false)}
      style={{zIndex:'12'}}
      onOpen={()=>setOpen(true)}
      open={open}
      direction='down'
      className='speedDial'
      icon={
        <img className='speedDialIcon' src={user.avatar.url?user.avatar.url:profile} alt='Profile' />
      }
      >
        {options.map((item)=>(
          <SpeedDialAction key={item.name} icon={item.icon}
          tooltipOpen={window.innerWidth<=600?true:false}
          tooltipTitle={item.name} onClick={item.func}/>
        ))}
    </SpeedDial>
    </>
  )
}
