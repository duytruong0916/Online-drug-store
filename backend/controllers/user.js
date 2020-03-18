const User = require("../models/user");
const Orderschema = require("../models/order");
var bcrypt = require("bcryptjs");
const _ =require('lodash'); //for update

//CHECK USER ID
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User not found"
      });
    }
    req.profile = user;
    next();
  });
};

// GET USER INFORMATION
exports.read = (req,res)=>{
    req.profile.password= undefined;
    return res.json({user: req.profile});

};

exports.purchaseHistory = (req,res)=>{
    Orderschema.Order.find({user: req.profile._id})
         .populate('user', "_id last_name")
         .sort('-created')
         .exec((err,orders)=>{
             if(err){
                return res.status(400).json({error:errorHandler(err)})
             }
             res.json(orders);
             console.log(orders)
         })
};

// UPDATE USER INFORMATION
exports.update = (req,res)=>{
  const {first_name,last_name, email,password, gender, phoneNumber,creditCardNumber} = req.body;
  User.findOne({email:req.profile.email},(err,user)=>{
      if(err){
          console.log('Something went wrong. Try later')
          return res.status(400).json({error:'Something went wrong. Try later'})
      }
      bcrypt.genSalt(10, (err, salt) => {
        let newuser = {
          password: password,
        };
        bcrypt.hash(newuser.password, salt, (err, hash) => {
          if (err) console.log(err);
          newuser.password = hash;
          const updatedFields = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: newuser.password,
            gender: gender,
            phoneNumber: phoneNumber,
            creditCardNumber: creditCardNumber
          }
          user = _.extend(user,updatedFields);  //update fields
          user.save((err,success)=>{
              if(err){
                  console.log(err)
                  return res.json({error:'Email already exists'})
              }
              console.log('Updated User successfully');
              res.json(user);
          })
        })
      });
  })
};

exports.addOrderToHistory = (req, res, next) => {
  let history = [];
  req.body.order.products.forEach(item => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.quantity,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount
    });
  });
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({ error: "cound not update user history" });
      }
      next();
    }
  );
};

