const express=require('express');
const {isAuthenticcatedUser, authorizeRole}=require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders, getAllorders, UpdateOrder, deleteOrder } = require('../controller/orderC');
const router=express.Router();

router.route('/order/new').post(isAuthenticcatedUser,newOrder);
router.route('/order/:id').get(isAuthenticcatedUser,getSingleOrder);
router.route('/orders/me').get(isAuthenticcatedUser,myOrders);
router.route('/admin/orders').get(isAuthenticcatedUser,authorizeRole("admin"),getAllorders);
router.route('/admin/order/:id').put(isAuthenticcatedUser,authorizeRole("admin"),UpdateOrder).delete(isAuthenticcatedUser,authorizeRole("admin"),deleteOrder);
module.exports=router;