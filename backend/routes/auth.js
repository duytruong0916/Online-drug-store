const express = require('express');
const router = express.Router()
const { signout, AuthenticateUser } = require('../controllers/auth')
const { userSigninValidator } = require('../validators/auth');
const { runValidation } = require('../validators/index');

router.get('/user/signout', signout);
router.post('/signin', userSigninValidator, runValidation, AuthenticateUser)

module.exports = router;
