import React from 'react'
import './LoginTag.css'
import Login from '../../Images/Login.jpg'
import { Link } from 'react-router-dom'
export default function LoginTag() {
  return (
    <Link className='Login' to={`Login`}>
    <img src={Login} alt="Login"/>
        </Link>
  )
}
