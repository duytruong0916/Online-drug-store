const Product = require('../models/product');

exports.productById = (req,res, next,id)=>{
    Product.findById(id)
    .exec((err,product)=>{
        if(err||!product){
            return res.status(400).json({error: 'Product Not Found'})
        }
        req.product = product;
        next();
    })
};

exports.read = (req,res) =>{
    return res.json(req.product);
};

exports.list =(req,res)=>{
    Product.find()
            .select("-photo")
            .exec((err,products)=>{
                if(err){
                    return res.status(400).json({error: "Products not found"});
                }
                res.send(products);
            })
};

//$inc ->include , 
exports.decreaseQuantity = (req,res,next)=>{
    let bulkOps =  req.body.order.products.map(item=>{
        return{
            updateOne:{
                filter: {_id: item._id},
                update: {$inc: {quantity: -item.count,sold: +item.count}}
            }
        }
    });
    Product.bulkWrite(bulkOps,{}, (error,products)=>{
        if(error){
            return res.status(400).json({error:'could not update the product'})
        }
        next();
    })
};