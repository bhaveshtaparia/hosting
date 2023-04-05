import React from 'react'
import {ReactNavbar} from 'overlay-navbar';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import logo from '../../Images/logo2.png'

export default function Header() {
  return (
    <Router>

        <ReactNavbar
      
        link1Text="Home"
        link2Text="Product"
        link3Text="Contact"
        link4Text="About"
        
        link1Url="/"
        link2Url="/products"
        link3Url="/contact"
        link4Url="/about"
        
        link1ColorHover="green"
        link1Margin="50px"
        navColor1="white"
        link1Size="3v"
        logo={logo}
        
        
        />
    </Router>
  )
}
