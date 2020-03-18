const express = require('express');
const router = express.Router()
const  {userById, read, update ,purchaseHistory} = require('../controllers/user');
const  {requireSignin, isAuth} = require('../controllers/auth');

router.get('/user/:userId', requireSignin, isAuth,read)
router.put('/user/update/:userId', requireSignin, isAuth, update)
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory)
router.param('userId', userById); 

module.exports = router;