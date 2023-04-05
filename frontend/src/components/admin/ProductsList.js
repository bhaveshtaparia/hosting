import React, { useEffect } from 'react'
import {DataGrid} from '@material-ui/data-grid'
import './Products.css'
import { useSelector,useDispatch } from 'react-redux'
import { getAdminProduct,clearErrors,deleteProduct } from '../../actions/productAction'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@material-ui/core'
import MetaData from '../MetaData'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar  from './Sidebar'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
export default function ProductsList() {
    const dispatch =useDispatch();
    const alert =useAlert();
    const {error,products}=useSelector((state)=>state.products)
    const {error:deleteError,isDeleted}=useSelector(state=>state.product)
    const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id));
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
            alert.success("Product Deleted Successfully");
            Navigate('/admin/dashboard');
            dispatch({type:DELETE_PRODUCT_RESET});
        }
        dispatch(getAdminProduct());
    },[dispatch,alert,error,Navigate,deleteError,isDeleted]);
    const columns=[
        {field:"id",headerName:"Products Id",minWidth:200,flex:0.5},
        {field:"name",headerName:"Name",minWidth:250,flex:1},
        {field:"stock",headerName:"Stock",type:"number",minWidth:150,flex:0.5},
        {field:"price",headerName:"Price",type:"number",minWidth:250,flex:0.5},
        {field:"actions",headerName:"Actions",type:"number",minWidth:150,flex:0.5,sortable:false,
    renderCell:(params)=>{
        return (
            <>
            <Link to={`/admin/products/${params.getValue(params.id,"id")}`}>
                <EditIcon/>
            </Link>
            <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}><DeleteIcon/></Button>
            </>
        )
    }},
    ]
    const rows=[];
    products && products.forEach(item => {
        rows.push({
            id:item._id,
            stock:item.stock,
            price:item.price,
            name:item.name
        })
    });
  return (
   <>
   <MetaData title={`All-Products--Admin`}/>
   <div className='dashboard'>
    <Sidebar/>
    <div className='productListContainer'>
    <h1 id="productsListHeading"> All Products </h1>   
    <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='productsListTable'/>
    </div>
   </div>
   </>
  )
}
