import React, { useEffect } from 'react'
import {DataGrid} from '@material-ui/data-grid'
import './Products.css'
import { useSelector,useDispatch } from 'react-redux'

import { getAllUsers,clearErrors, deleteUser } from '../../actions/userAction'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../MetaData'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar  from './Sidebar'

import { DELETE_USERS_RESET } from '../../constants/userConstants'
export default function UserList() {
    const dispatch =useDispatch();
    const alert =useAlert();
    const {error,users}=useSelector((state)=>state.allUsers)

    const {error:deleteError,isDeleted,message}=useSelector((state)=>state.profile);
    const deleteUserHandler=(id)=>{
        dispatch(deleteUser(id));
    }
    const Navigate =useNavigate();
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success(message);
            Navigate('/admin/users');
            dispatch({type:DELETE_USERS_RESET});
        }
        dispatch(getAllUsers());
    },[dispatch,alert,error,Navigate,deleteError,isDeleted,message]);
    const columns=[
        {field:"id",headerName:"User Id",minWidth:200,flex:0.5},
        {field:"email",headerName:"Email",minWidth:180,flex:0.5},
        {field:"name",headerName:"Name",minWidth:100,flex:0.5},
        {field:"role",headerName:"Role",minWidth:150,flex:0.5,
        cellClassName:(params)=>{
            return params.getValue(params.id,"role")==="admin"?"GreenColor":"RedColor"
                
        },
    },
        {field:"actions",headerName:"Actions",minWidth:100,flex:0.5,sortable:false,
    renderCell:(params)=>{
        return (
            <>
            <Link to={`/admin/users/${params.getValue(params.id,"id")}`}>
                <EditIcon/>
            </Link>
            <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}><DeleteIcon/></Button>
            </>
        )
    }},
    ]
    const rows=[];
    users && users.forEach(item => {
        rows.push({
            id:item._id,
            email:item.email,
            role:item.role,
            name:item.name
        })
    });
  return (
   <>
   <MetaData title={`All Users--Admin`}/>
   <div className='dashboard'>
    <Sidebar/>
    <div className='productListContainer'>
    <h1 id="productsListHeading"> All Users </h1>   
    <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productsListTable'/>
    </div>
   </div>
   </>
  )
}
