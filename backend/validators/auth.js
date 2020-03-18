const {check} = require('express-validator');

exports.userSignupValidator = [
    check('last_name')
    .not()
    .isEmpty()
    .withMessage('Lastname is required'),

    check('first_name')
    .not()
    .isEmpty()
    .withMessage('Firstname is required'),

    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),

    check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters'),

    check('phoneNumber')
    .isLength({min: 10})
    .withMessage('Invalid phone number'),

    check('creditCardNumber')
    .not()
    .isEmpty()
    .withMessage('CreditCard number is required'),
]

exports.userSigninValidator = [

    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),

    check('password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters'),
]
