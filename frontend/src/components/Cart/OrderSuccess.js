import React from 'react'
import  CheckCircleIcon from '@material-ui/icons/CheckCircle'
import './orderSuccess.css'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'


export default function OrderSuccess() {
  return (
    <div className='orderSuccess'>
        <CheckCircleIcon/>
        <p>Your Order has been Placed successfully</p>
        <Link to='/orders'>View Order</Link>

        </div>
  )
}
