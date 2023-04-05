import React, { useEffect, useState } from 'react'
import './UpdateProfile.css'
import MetaDate from '../MetaData'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import Loder from '../loder/Loder'
import FaceIcon from '@material-ui/icons/Face'
import Profile from '../../Images/profile.png'
import {useDispatch,useSelector} from 'react-redux'
import { clearErrors,updateProfile,lodeUser} from '../../actions/userAction'
import {useAlert}from 'react-alert'
import {useNavigate} from 'react-router-dom'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
export default function UpdateProfile() {
  const dispatch =useDispatch();
  const alert=useAlert();
  const {user}=useSelector(state=>state.user);
  const {error,isUpdated,loading}=useSelector(state=>state.profile);
  const [avatar,setavatar]=useState();
  const [avatarPreview,setavatarPreview]=useState(Profile);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const updateProfileSubmit=(e)=>{
    e.preventDefault();
    const myForm=new FormData();
    myForm.set('name',name);
    myForm.set('email',email);
    myForm.set('avatar',avatar);
    dispatch(updateProfile(myForm))

}

const updateProfileDataChange=(e)=>{
    if(e.target.name==="avatar"){
      const reader =new FileReader();
      reader.onload=()=>{
        if(reader.readyState===2){
            setavatarPreview(reader.result);
            setavatar(reader.result);
        }
    }
    reader.readAsDataURL(e.target.files[0]);



    }
}

const Navigate=useNavigate();
/// using use effect 
useEffect(()=>{
  if(user){
    setName(user.name);
    setEmail(user.email);
    setavatarPreview(user.avatar.url);
  }
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    if(isUpdated){
        alert.success('Profile Updated Successfully');
        dispatch(lodeUser());
        Navigate('/account');
        dispatch({
          type:UPDATE_PROFILE_RESET
        });

    }
},[dispatch,error,alert,Navigate,loading,user,isUpdated])



  return (
    <>
    {loading?<Loder/>:<>

<MetaDate title="Update Profile"/>
 <div className='updateProfileContainer'>
     <div className='updateProfileBox'>
      <h2 className='updateProfileHeading'>Update Profile</h2>
     <form className='updateProfileForm'  encType="multipart/from-data"
         onSubmit={updateProfileSubmit}>
             <div className='updateProfileName'>
                 <FaceIcon/>
                 <input type="text" placeholder='Name' required
                 name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
             </div>
             <div className='updateProfileEmail'>
                 <MailOutlineIcon/>
                 <input 
                   type="email"
                   placeholder='Email'
                   required
                   value={email}
                   name="email"
                   onChange={(e)=>setEmail(e.target.value)}/>
             </div>
             
             <div id='updateProfileImage'>
                 <img src={avatarPreview} alt="avatar Preview"/>
                 <input
                 type="file"
                 name="avatar"
                 accept='image/*'
                 onChange={updateProfileDataChange}
                 />
             </div>
             <input type="submit" value="Update" className='updateProfileBtn'/>
         </form>
      </div>
     </div>
</>}
    </>
    
  )
}
