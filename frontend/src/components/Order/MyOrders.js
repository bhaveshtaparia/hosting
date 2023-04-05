import React, { useEffect } from 'react'
import {DataGrid} from '@material-ui/data-grid'
import {useSelector,useDispatch} from 'react-redux'
import {clearErrors,myOrders} from '../../actions/orderAction'
import Loder from '../loder/Loder'
import {Link} from 'react-router-dom'
import {useAlert} from 'react-alert'
import Typography from '@material-ui/core/Typography'
import MetaData from '../MetaData'
import  LaunchIcon from '@material-ui/icons/Launch' 
import './myOrders.css'
export default function MyOrders() {
    const dispatch=useDispatch();
    const alert=useAlert();
    const {loading,error,orders}=useSelector((state)=>state.myOrders)
    const {user}=useSelector((state)=>state.user);
    const columns=[
        {field:"id",headerName:"Order ID",minWidth:300,flex:1},
        {field:"status" ,headerName:"Status",minWidth:150,flex:0.5,cellClassName:(params)=>{
            return (
                params.getValue(params.id,"status")==="Delivered"?"GreenColor":"RedColor"
                )
        }},
        {field:"itemQty" ,headerName:"Item Qty",type:"number",minWidth:130,flex:0.5},
        {field:"amount" ,headerName:"Account" ,type:"number",minWidth:210,flex:0.5},
        {field:"action" ,headerName:"Actions" ,minWidth:130,type:"number",flex:0.3,sortable:false,

        renderCell:(params)=>{
            return (
                <Link to={`/order/${params.getValue(params.id,"id")}`}><LaunchIcon/></Link>
            )
        }
    },
    ];
    const rows=[];
    orders && orders.forEach((item,index)=>(
        rows.push({
            itemQty:item.orderItem.length,
            id:item._id,
            status:item.orderStatus,
            amount:item.totalPrice
        })
    ))
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    },[dispatch,error,alert]);
  return (
<>
<MetaData title={`${user.name}-orders`}/>
{loading?(<Loder/>):(

    <div className='myOrdersPage'>
    <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="myOrdersTable" autoHeight/>
<Typography id="myOrdersHeading">{user.name}'s orders</Typography>

</div>
    )
}
</>
  )
}
