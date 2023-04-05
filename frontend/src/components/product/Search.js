import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import MetaData from '../MetaData';
import './Search.css'
export default function Search() {
    const Navigate=useNavigate();
  const [keyword,setKeyword]=useState("")
  const searchSubmitHandler=(e)=>{
    e.preventDefault();
    if(keyword.trim()){
        console.log()
        Navigate(`/products/${keyword}`)
    }else{
        // history.push('/products');
        Navigate(`/products`)
        
    }
  }
    return (
    <>
    <MetaData title={`Search A Product--ECOMMERCE`}/>
    <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
        type="text"
        placeholder='Search a Product ...'
        onChange={(e)=>setKeyword(e.target.value)}
        />
        <input type="submit" value="Search"/>
    </form>
    </>
  )
}
