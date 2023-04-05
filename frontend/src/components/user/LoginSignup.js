import React, { useEffect, useState } from 'react'
import './LoginSignup.css'
import Loder from '../loder/Loder'
import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import FaceIcon from '@material-ui/icons/Face'
import Profile from '../../Images/profile.png'
import {useDispatch,useSelector} from 'react-redux'
import { clearErrors, login, register } from '../../actions/userAction'
import {useAlert}from 'react-alert'
import {useNavigate} from 'react-router-dom'
export default function LoginSignup() {
   // backend api calling action  part in react-redux
   const dispatch =useDispatch();
   const {error,loading,isAuthenticated}=useSelector(state=>state.user);
   const alert=useAlert();
    const loginTab=useRef(null);
    const registerTab=useRef(null)
    const switcherTab=useRef(null)
    const loginSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword));
    }
    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    })
    const {name,email,password}=user;
    const [avatar,setavatar]=useState();
    const [avatarPreview,setavatarPreview]=useState(Profile);
    const registerSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set('name',name);
        myForm.set('email',email);
        myForm.set('password',password);
        myForm.set('avatar',avatar);
        dispatch(register(myForm))

    }
    
    const registerDataChange=(e)=>{
        if(e.target.name==="avatar"){
          const reader =new FileReader();
          reader.onload=()=>{
            if(reader.readyState===2){
                setavatarPreview(reader.result);
                setavatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);



        }else{
            setUser({...user,[e.target.name]:e.target.value});
        }
    }
    const location=useLocation();
    const redirect=location.search?location.search.split("=")[1]:'account'
const Navigate=useNavigate();
    /// using use effect 
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated){
            Navigate(`/${redirect}`)
        }
    },[dispatch,error,alert,Navigate,isAuthenticated,loading,redirect])




    const switchTabs=(e,tab)=>{
   if(tab==='login'){
    switcherTab.current.classList.add('shiftToNeutral');
    switcherTab.current.classList.remove('shiftToRight');
    registerTab.current.classList.remove('shiftToNeutralForm');
    loginTab.current.classList.remove('shiftToLeft');
}
if(tab==='register'){
    switcherTab.current.classList.add('shiftToRight');
    switcherTab.current.classList.remove('shiftToNeutral');
    registerTab.current.classList.add('shiftToNeutralForm')
    loginTab.current.classList.add('shiftToLeft');


   }
    }
  return (
    <>
    {loading?<Loder/>:
     <>
     <div className='LoginSignupContainer'>
         <div className='LoginSignupBox'>
             <div>
 
             <div className='login_signup_toggle'>
              <p onClick={(e)=>switchTabs(e,'login')}>LOGIN</p>
              <p onClick={(e)=>switchTabs(e,'register')}>REGISTER</p>
             </div>
             <button ref={switcherTab}></button>
             </div>
             <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                 <div className='loginEmail'>
                     <MailOutlineIcon/>
                     <input
                     type="email"
                     placeholder='Email'
                     required
                     value={loginEmail}
                     onChange={(e)=>setLoginEmail(e.target.value)}
                     />
                 </div>
                <div className='loginPassword'>
                 <LockOpenIcon/>
                 <input type="password" placeholder='Password' required value={loginPassword}
                 onChange={(e)=>setLoginPassword(e.target.value)}/>
                </div>
                <Link to='/password/forget'>Forget Password</Link>
                <input type="submit" value="Login" className='loginBtn'/>
             </form>
 
             <form className='signupForm' ref={registerTab} encType="multipart/from-data"
             onSubmit={registerSubmit}>
                 <div className='signupName'>
                     <FaceIcon/>
                     <input type="text" placeholder='Name' required
                     name="name" value={name} onChange={registerDataChange}/>
                 </div>
                 <div className='signupEmail'>
                     <MailOutlineIcon/>
                     <input 
                       type="email"
                       placeholder='Email'
                       required
                       value={email}
                       name="email"
                       onChange={registerDataChange}/>
                 </div>
                 <div className='signupPassword'>
                 <LockOpenIcon/>
                 <input type="password" placeholder='Password' required name='password' value={password}
                 onChange={registerDataChange}/>
                 </div>
                 <div id='registerImage'>
                     <img src={avatarPreview} alt="avatar Preview"/>
                     <input
                     type="file"
                     name="avatar"
                     accept='image/*'
                     onChange={registerDataChange}
                     />
                 </div>
                 <input type="submit" value="Register" className='signupBtn'/>
             </form>
         </div>
     </div>
     </>
    }
    </>
   
  )
}
