import React, { useEffect } from 'react'
import {DataGrid} from '@material-ui/data-grid'
import './Products.css'
import { useSelector,useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../MetaData'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar  from './Sidebar'
import {deleteOrder,clearErrors, getAllOrders} from '../../actions/orderAction'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'
export default function OrderList() {
    const dispatch =useDispatch();
    const alert =useAlert();
    const {error,orders}=useSelector((state)=>state.allOrders)
    const {error:deleteError,isDeleted}=useSelector(state=>state.order)
    const deleteOrderHandler=(id)=>{
        dispatch(deleteOrder(id));
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
            alert.success("Order Deleted Successfully");
            Navigate('/admin/orders');
            dispatch({type:DELETE_ORDER_RESET});
        }
        dispatch(getAllOrders());
    },[dispatch,alert,error,Navigate,deleteError,isDeleted]);
    const columns=[
      {field:"id",headerName:"Order ID",minWidth:300,flex:1},
      {field:"status" ,headerName:"Status",minWidth:150,flex:0.5,cellClassName:(params)=>{
          return (
              params.getValue(params.id,"status")==="Delivered"?"GreenColor":"RedColor"
              )
      }},
      {field:"itemQty" ,headerName:"Item Qty",type:"number",minWidth:130,flex:0.5},
      {field:"amount" ,headerName:"Amount" ,type:"number",minWidth:210,flex:0.5},
        {field:"actions",headerName:"Actions",type:"number",minWidth:150,flex:0.5,sortable:false,
    renderCell:(params)=>{
        return (
            <>
            <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                <EditIcon/>
            </Link>
            <Button onClick={()=>deleteOrderHandler(params.getValue(params.id,"id"))}><DeleteIcon/></Button>
            </>
        )
    }},
    ]
    const rows=[];
    orders && orders.forEach(item => {
        rows.push({
            id:item._id,
            itemQty:item.orderItem.length,
            amount:item.totalPrice,
            status:item.orderStatus
        })
    });
  return (
   <>
   <MetaData title={`All-Orders--Admin`}/>
   <div className='dashboard'>
    <Sidebar/>
    <div className='productListContainer'>
    <h1 id="productsListHeading"> All Orders </h1>   
    <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productsListTable'/>
    </div>
   </div>
   </>
  )
}
