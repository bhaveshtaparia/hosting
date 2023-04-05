import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar.js'
import {useDispatch, useSelector} from 'react-redux'
import {useAlert} from 'react-alert';
import {Button} from '@material-ui/core'
import MetaData from '../MetaData'

import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PersonIcon from '@material-ui/icons/Person'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'

import { useNavigate, useParams } from 'react-router-dom';
import './NewProduct.css'

import { clearErrors,getUserDetails, updateUser } from '../../actions/userAction.js';
import Loder from '../loder/Loder.js';
import { UPDATE_USERS_RESET } from '../../constants/userConstants.js';
export default function UpdateUser() {
const dispatch=useDispatch();
const alert=useAlert();
const {loading,error,user}=useSelector((state)=>state.userDetails);
const {loading:updateLoading,error:updateError,isUpdated}=useSelector((state)=>state.profile);
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [role,setRole]=useState("");


const Navigate=useNavigate();
const params=useParams(); 
const userId=params.id;
     useEffect(()=>{
        if(!(user && user._id===userId)){
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name);
             setEmail(user.email);
             setRole(user.role);
            
        }
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      if(updateError){
        alert.error(updateError);
        dispatch(clearErrors());
      }
      if(isUpdated){
        alert.success("User Updated SuccessFully");
        Navigate('/admin/users');
        dispatch({type:UPDATE_USERS_RESET})
      }
     },[dispatch,alert,error,updateError,Navigate,isUpdated])
     const updateUserSubmitHandler=(e)=>{
        e.preventDefault();
        const myform =new FormData();
        myform.set("name",name);
        myform.set("email",email);
        myform.set("role",role);
     
        dispatch(updateUser(userId,myform));
     }   
     
  return (
    <>
    <MetaData title="Update User-->admin"/>
    <div className='dashboard'>
<Sidebar/>
<div className='newProductContainer'>
{loading?<Loder/>:<form className='createProductForm' onSubmit={updateUserSubmitHandler}>
    <h1>Update Users</h1>
    <div>
        <PersonIcon/>
        <input type='text' placeholder='Name' required value={name} onChange={(e)=>setName(e.target.value)}/>
    </div>
    <div>
        <MailOutlineIcon/>
        <input type='email' placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </div>
    
    <div>
        <VerifiedUserIcon/>
        <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="">Choose Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>

        </select>
    </div>

 
   
<Button
onClick={updateUserSubmitHandler}
  id="createProductBtn"
  type="submit" disabled={updateLoading?true:false ||role===""?true:false}>  
Update
</Button>
</form>}
</div>
    </div>
    </>
  )
}
