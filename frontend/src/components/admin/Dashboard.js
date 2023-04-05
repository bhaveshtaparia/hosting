import React, { useEffect } from 'react'
import Sidebar from './Sidebar.js'
import './dashboard.css'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {Doughnut,Line} from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js';
import { useSelector,useDispatch } from 'react-redux'
import { getAdminProduct } from '../../actions/productAction'
import { getAllOrders } from '../../actions/orderAction.js'
import { getAllUsers } from '../../actions/userAction.js'

export default function Dashboard() {
const dispatch=useDispatch();
const {error,products}=useSelector((state)=>state.products)
const {orders}=useSelector((state)=>state.allOrders)
const {users}=useSelector((state)=>state.allUsers)
  let outOfStock=0;
  products && products.forEach((item)=>{
    if(item.stock<=0){
      outOfStock+=1;
    }
  })
  useEffect(()=>{
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
},[dispatch]);
  ChartJS.register(...registerables);

  let totalAmount=0;
  orders && orders.forEach(item=>{
    totalAmount+=item.totalPrice;
  })
  const lineState={
labels:["Initial Amount","Amount Earned"],
datasets:[
  {

    label:"TOTAL AMOUNT",
    backgroundColor:["tomato"],
    hoverBackgroundColor:["yellow"],
    data:[0,totalAmount],
  },
]
  };
  const doughnutState={
    labels:["Out Of Stock","Instock"],
    datasets:[{
      backgroundColor:["tomato","Yellow"],
      hoverBackgroundColor:["Brown","purple"],
      data:[outOfStock,products.length-outOfStock]
    }]
  }
  return (
    <div className='dashboard'>
        <Sidebar/>
        <div className='dashboardContainer'>
          <Typography component="h1">Dashboard</Typography>
          <div className='dashboardSummary'>
            <div>
              <p>
                Total Amount<br/>RS {totalAmount}
              </p>
            </div>
            <div className='dashboardSummaryBox2'>
              <Link to="/admin/products">
                <p>product</p>
                <p>{products && products.length}  </p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>

          <div className='lineChart'>
            <Line data={lineState}/>
          </div>
          <div className='doughnut'>
            <Doughnut data={doughnutState}/>
          </div>
        </div>
    </div>
  )
}
