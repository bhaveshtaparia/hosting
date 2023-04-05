const express=require('express');
const app = require('../app');

// at controller folder we are writing arrow function which used in crud operation
 const {isAuthenticcatedUser, authorizeRole}=require('../middleware/auth');
const {getAllproducts, createProduct, updateproduct, deleteProduct, getProductDetails, createProductReviews, getProductReviews, deleteReviews, getAdminproducts } = require('../controller/productC');
const router=express.Router();
router.route('/product').get(getAllproducts);
router.route('/admin/products').get(isAuthenticcatedUser,authorizeRole("admin"),getAdminproducts);
router.route('/product/admin/new').post(isAuthenticcatedUser,authorizeRole("admin"),createProduct);
router.route('/product/admin/:id').put(isAuthenticcatedUser,authorizeRole("admin"),updateproduct).delete(isAuthenticcatedUser,authorizeRole("admin"),deleteProduct);
router.route('/product/:id').get(getProductDetails);
router.route('/review').put(isAuthenticcatedUser,createProductReviews);
router.route('/reviews').get(getProductReviews);
router.route('/reviews').delete(isAuthenticcatedUser,authorizeRole("admin"),deleteReviews);
module.exports=router;
// exporting at app.js file 