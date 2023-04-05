import React, { useEffect, useState } from 'react'
import './UpdatePassword.css'
import MetaDate from '../MetaData'
import Loder from '../loder/Loder'
import {useDispatch,useSelector} from 'react-redux'
import { clearErrors,updatePassword} from '../../actions/userAction'
import {useAlert}from 'react-alert'
import {useNavigate} from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
export default function UpdatePassword() {
    const dispatch =useDispatch();
    const alert=useAlert();
  
    const {error,isUpdated,loading}=useSelector(state=>state.profile);
 
   const [oldPassword,setOldPassword]=useState("");
   const [newPassword,setNewPassword]=useState("");
   const [confirmPassword,setConfirmPassword]=useState("");
  
    const updatePasswordSubmit=(e)=>{
      e.preventDefault();
      const myForm=new FormData();
      myForm.set('oldPassword',oldPassword);
      myForm.set('newPassword',newPassword);
      myForm.set('confirmPassword',confirmPassword);
    
      dispatch(updatePassword(myForm))
  
  }
  

  
  const Navigate=useNavigate();
  /// using use effect 
  useEffect(()=>{
      if(error){
          alert.error(error);
          dispatch(clearErrors());
      }
      if(isUpdated){
          alert.success('Password Updated Successfully');
          Navigate('/account');
          dispatch({
            type:UPDATE_PASSWORD_RESET
          });
  
      }
  },[dispatch,error,alert,Navigate,loading,isUpdated])
  
  
  return (
    <>
    {loading?<Loder/>:<>

<MetaDate title="Change Password"/>
 <div className='updatePasswordContainer'>
     <div className='updatePasswordBox'>
      <h2 className='updatePasswordHeading'>Update Profile</h2>
     <form className='updatePasswordForm'  encType="multipart/from-data"
         onSubmit={updatePasswordSubmit}>
             
            
             <div className='signupPassword'>
                 <VpnKeyIcon/>
                 <input type="password" placeholder='Old Password' required name='password' value={oldPassword}
                 onChange={(e)=>setOldPassword(e.target.value)}/>
                 </div>

                 <div className='signupPassword'>
                 <LockOpenIcon/>
                 <input type="password" placeholder='New Password' required name='password' value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}/>
                 </div>

                 <div className='signupPassword'>
                 <LockIcon/>
                 <input type="password" placeholder='Confirm Password' required name='password' value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}/>
                 </div>
             <input type="submit" value="Change" className='updatePasswordBtn'/>
         </form>
      </div>
     </div>
</>}
    </>
  )
}
