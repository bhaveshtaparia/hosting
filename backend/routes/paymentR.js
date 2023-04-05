const express=require('express');
const { processPayment, sendStripeApiKey } = require('../controller/paymentC');
const router=express.Router();
const {isAuthenticcatedUser}=require('../middleware/auth');
router.route('/payment/process').post(isAuthenticcatedUser,processPayment);
router.route('/stripeapikey').get(isAuthenticcatedUser,sendStripeApiKey);
module.exports=router;