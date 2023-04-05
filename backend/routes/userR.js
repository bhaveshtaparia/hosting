const express=require('express');
// const app = require('../app');
const {authorizeRole,isAuthenticcatedUser}=require('../middleware/auth');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails,
     updatePassword, updateUserProfile, getAllUser, getSingleUser, updateUserRole, deleteUser, createProductReviews } = require('../controller/userC');
const router=express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forget').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticcatedUser,getUserDetails);
router.route('/logout').get(logoutUser);
router.route('/password/update').put(isAuthenticcatedUser,updatePassword);
router.route('/me/update').put(isAuthenticcatedUser,updateUserProfile);
router.route('/admin/users').get(isAuthenticcatedUser,authorizeRole('admin'),getAllUser);
router.route('/admin/users/:id').get(isAuthenticcatedUser,authorizeRole('admin'),getSingleUser).put(isAuthenticcatedUser,authorizeRole("admin"),updateUserRole).delete(isAuthenticcatedUser,authorizeRole("admin"),deleteUser);

module.exports=router;