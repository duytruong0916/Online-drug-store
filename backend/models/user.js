const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // For all the emails are unique.
var bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    first_name:{ 
        type: String,
        trim: true,
        required:true,
    },
    last_name:{ 
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required:true,
    },
    gender: {
        type: String,
        trim: true
    },
    phoneNumber:{
        type: String,
        default: 0
    },
    creditCardNumber: {
        type: String,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {timestamps: true});

const User = module.exports = mongoose.model('User', userSchema);
userSchema.plugin(uniqueValidator); 

module.exports.getUserbyID = function(id, callback){
    User.findById(id, callback);
}
module.exports.findUser = function(email, callback){
    let query = {email: email};
    User.findOne(query, callback);
}
module.exports.RegisterUser = function(newuser, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newuser.password, salt, (err,hash)=>{
            if(err) console.log(err);
            newuser.password = hash;
            newuser.save(callback);
        });
    })
}
module.exports.comparePassword = function(userpassword, hash, callback){
    bcrypt.compare(userpassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    })

}
