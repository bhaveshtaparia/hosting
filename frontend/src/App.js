
import './App.css';
import Header from './components/Headers/Header'
import Footer from './components/footer/Footer'
import { BrowserRouter as Router,Navigate,Route,Routes } from 'react-router-dom';
import Home from './components/Home/Home.js'
import ProductDetails from './components/product/ProductDetails';
import SearchTag from './components/search/SearchTag';
import Products from './components/product/Products.js';
import Search from './components/product/Search.js'
import LoginTag from './components/login/LoginTag';
import LoginSignup from './components/user/LoginSignup';
import { lodeUser } from './actions/userAction';
import UserOptions from './components/Headers/UserOptions.js'
import Profile from './components/user/Profile.js'
import React, { useState } from 'react';
import store from './store';
import { useSelector } from 'react-redux';
import  UpdateProfile  from './components/user/UpdateProfile.js';
import  UpdatePassword  from './components/user/UpdatePassword.js';
import Cart from './components/Cart/Cart.js'
import Shipping from './components/Cart/Shipping.js'
import ConfirmOrder from './components/Cart/ConfirmOrder.js'
import Payment from './components/Cart/Payment.js'
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess.js'
import MyOrders from './components/Order/MyOrders.js'
import OrderDetails from './components/Order/OrderDetails.js'
import Dashboard from './components/admin/Dashboard.js'
import ProductsList from './components/admin/ProductsList.js'
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct.js';
import OrderList from './components/admin/OrderList.js';
import ProcessOrder from './components/admin/ProcessOrder.js';
import UserList from './components/admin/UserList.js';
import UpdateUser from './components/admin/UpdateUser.js';
import ProductReview from './components/admin/ProductReview.js';
import NotFound from './components/NotFound.js';
import Contact from './components/Contact/Contact.js'
import About from './components/About/About.js'


function App() {
  window.addEventListener("contextmenu",(e)=>e.preventDefault())
  const {isAuthenticated ,user}=useSelector((state)=>state.user)
  const [stripeApiKey,setStripeApiKey]=useState("");
  async function getStripeApiKey(){
    const {data}=await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }
  React.useEffect(()=>{
 store.dispatch(lodeUser());
 getStripeApiKey();
  },[]);
  return (
    <>
    <Header/>
 <Router>


    <SearchTag/>
    
      {isAuthenticated &&<UserOptions user={user}/>}
      {isAuthenticated===false &&<LoginTag/>}
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/product/:id' element={<ProductDetails/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/products/:keyword' element={<Products/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/account' element={ isAuthenticated?<Profile/>:<Navigate to='/login'/>}/>
      <Route path='/me/update' element={ isAuthenticated?<UpdateProfile/>:<Navigate to='/login'/>}/>
      <Route path='/password/update' element={ isAuthenticated?<UpdatePassword/>:<Navigate to='/login'/>}/>
      <Route path='/shipping' element={ isAuthenticated?<Shipping/>:<Navigate to='/login'/>}/>
      <Route path='/order/confirm' element={ isAuthenticated?<ConfirmOrder/>:<Navigate to='/login'/>}/>
      <Route path='/success' element={ isAuthenticated?<OrderSuccess/>:<Navigate to='/login'/>}/>
      <Route path='/orders' element={ isAuthenticated?<MyOrders/>:<Navigate to='/login'/>}/>
      <Route path='/order/:id' element={ isAuthenticated?<OrderDetails/>:<Navigate to='/login'/>}/>
      <Route path='/admin/dashboard' element={ isAuthenticated && user.role==="admin"?<Dashboard/>:<Navigate to='/login'/>}/>
      <Route path='/admin/products' element={ isAuthenticated && user.role==="admin"?<ProductsList/>:<Navigate to='/login'/>}/>
      <Route path='/admin/product' element={ isAuthenticated && user.role==="admin"?<NewProduct/>:<Navigate to='/login'/>}/>
      <Route path='/admin/products/:id' element={ isAuthenticated && user.role==="admin"?<UpdateProduct/>:<Navigate to='/login'/>}/>
      <Route path='/admin/orders' element={ isAuthenticated && user.role==="admin"?<OrderList/>:<Navigate to='/login'/>}/>
      <Route path='/admin/order/:id' element={ isAuthenticated && user.role==="admin"?<ProcessOrder/>:<Navigate to='/login'/>}/>
      <Route path='/admin/users' element={ isAuthenticated && user.role==="admin"?<UserList/>:<Navigate to='/login'/>}/>
      <Route path='/admin/users/:id' element={ isAuthenticated && user.role==="admin"?<UpdateUser/>:<Navigate to='/login'/>}/>
      <Route path='/admin/reviews' element={ isAuthenticated && user.role==="admin"?<ProductReview/>:<Navigate to='/login'/>}/>
  
{/* {stripeApiKey && (
<Elements stripe={loadStripe(stripeApiKey)}>
      <Routes>
      <Route path='/process/payment' element={ isAuthenticated?<Payment/>:<Navigate to='/login'/>}/>
      </Routes>
</Elements>
  )} */}
  {stripeApiKey && (
   <Route path='/process/payment' 
   element={
    isAuthenticated?<Elements stripe={loadStripe(stripeApiKey)}>
  <Payment />  </Elements>:<Navigate to='/login'/>
    } />
 )}
      <Route path='/Login' element={<LoginSignup/>}/>
      <Route path='/cart' element={<Cart/>}/>
     </Routes>

 </Router>
    <Footer/>
    </>

  );
}

export default App;
