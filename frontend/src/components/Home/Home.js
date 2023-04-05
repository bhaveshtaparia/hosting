import React,{useEffect} from 'react'
import Product from './Product.js'
import './Home.css'

import MetaData  from '../MetaData.js'
import { clearErrors, getProduct } from '../../actions/productAction.js'
import {useSelector,useDispatch} from 'react-redux'
import Loder from '../loder/Loder.js'
import {useAlert}from 'react-alert'
export default function Home() {
  window.addEventListener("contextmenu",(e)=>e.preventDefault())
  const alert=useAlert()
  const dispatch=useDispatch();
  const {loading,error,products}=useSelector(state=>state.products);
  useEffect(()=>{
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct());
  },[dispatch,error,alert]);
  return (
    <>
    {loading?<Loder/>:
    <>
    <MetaData title="Ecommerce"/>
    <div className='banner'>

    <p>Welcome to Ecommerce</p>
      <h1>Find Amazing Product Below</h1>
      <a href='#container'>
        <button>
          Scroll 
        </button>
      </a>
    </div>
    <h2 className='HomeHeading'>Featured Product</h2>
    <div className='container' id='container'>
     {products && products.map(product=>(
      <Product product={product}/>
     ))}    
    </div>
</>
}
    </>
  )
}
