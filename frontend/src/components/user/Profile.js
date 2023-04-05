import React,{useEffect} from 'react'
import MetaData from '../MetaData'
import {useSelector} from 'react-redux'
import Loader from '../loder/Loder'
import {Link, useNavigate} from 'react-router-dom'
import './Profile.css'
export default function Profile() {
  const Navigate=useNavigate();
const {user,loading,isAuthenticated}=useSelector(state=>state.user)
useEffect(() => {
if(isAuthenticated===false){
Navigate('/login')
}
}, [Navigate,isAuthenticated ])

  return (
    <>
    {loading?<Loader/>:<>
    <MetaData title={`${user.name}`}/>
    <div className='profileContainer'>

    <div>
      <h1>MY Profile</h1>
       <img src={user.avatar.url} alt={user.name}/>
       <Link to='/me/update'>Edit Profile</Link>
    </div>
    <div>

    <div>
      <h4>Full Name</h4>
      <p>{user.name}</p>
    </div>
    <div>
      <h4>Email</h4>
      <p>{user.email}</p>
    </div>
    <div>
      <h4>Joined On</h4>
      <p>{String(user.createdAt).substr(0,10)}</p>
    </div>
    <div>
      <Link to='/orders'>My Orders</Link>
      <Link to='/password/update'>Change Password</Link>
    </div>
    </div>
    </div>
    </>}
    </>
  )
}
