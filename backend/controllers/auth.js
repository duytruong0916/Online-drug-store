const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const expressJwt =require('express-jwt'); //for the signin requirement

// USER LOG IN
exports.AuthenticateUser = (req, res) => {
  User.findUser(req.body.email, (error, user) => {
    if(error||!user){
        return res.status(400).json({error: 'User does not exist.'});
    }else {
          User.comparePassword(req.body.password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
                  res.cookie("t", token, {expire: new Date() + 3600});
                  const {last_name, _id, email} = user;
                  console.log("Logged In")
                  return res.json({
                      msg: "Successfully Authenticated",
                      expirationTime: 3600,
                      token: token,
                      user: {_id, last_name, email}
                  });
              } else
                  return res.json({error: 'User and Password do not match'});
          });
      };
  });
};

// USER LOG OUT
exports.signout = (req,res)=>{
    res.clearCookie('t');
    res.json({msg: "Successfully SignOut"});

};

// middleware for authorizing token
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req,res,next)=>{
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!user){
        return res.status(403).json({error: "Access denied"});
    }
    next();
};
