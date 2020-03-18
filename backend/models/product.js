const mongoose = require('mongoose');
const {ObjectId} = require('mongoose');

const productSchema = new mongoose.Schema({
    drugName:{ 
        type: String,
    },
    drugCompany:{ 
        type: String,
    },
    price:{ 
        type: Number,
    },
    image:{ 
        type: String,
    },
    stock:{ 
        type: Number,
    },
    drugCode:{
        type:String,
    },
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
