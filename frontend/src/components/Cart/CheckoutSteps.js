import React from 'react'
import { StepLabel, Typography ,Step,Stepper} from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import './CheckoutSteps.css'
export default function CheckoutSteps({activeSteps}) {
  const steps=[
{
    label:<Typography>Shipping Details</Typography>,
    icon:<LocalShippingIcon/>
},
{
    label:<Typography>Confirm Order</Typography>,
    icon:<LibraryAddCheckIcon/>
},
{
    label:<Typography>Payment</Typography>,
    icon:<AccountBalanceIcon/>
},

  ];
  const stepStyle={
    boxSizing:'border-box'
  }
    return (
    <>
    <Stepper alternativeLabel activeStep={activeSteps} style={stepStyle}>
{
    steps.map((item,index)=>(
        <Step key={index} active={activeSteps===index?true:false}
        completed={activeSteps>=index?true:false}>
            <StepLabel style={{color:activeSteps>=index?"tomato":"black"}} icon={item.icon}>{item.label}</StepLabel>
        </Step>
    ))
}
    </Stepper>
    </>
  )
}
