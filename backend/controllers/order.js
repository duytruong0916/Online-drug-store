const {Order, CartItem} = require('../models/order');

exports.orderById = (req,res,next, id)=>{
    Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err,order)=>{
        if(err||!order){
            return res.status(400).res({error: 'Failed to fetch data'});
        }
        req.order = order;
        next();
    })
};

exports.create = (req,res)=>{
    req.body.order.user = req.profile; 
    const order = new Order(req.body.order);
    order.save((err,data)=>{
        if(err){
            return res.status(400).res({error: "failed to fetch data"});
        }
        res.json(data);
    })
};

exports.listOrders = (req,res)=>{
    Order.find()
    .populate('user','_id name address')
    .sort('-created')
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({error: 'Failed to fetch order'});
        }
        res.json(orders);
    })
};

exports.getStatus = (req,res)=>{
    res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req,res)=>{
    Order.update({_id: req.body.orderId}, {$set: {status: req.body.status}}, (err,order)=>{
        if(err){
            return res.status(400).json({error: errorHanler(err)});
        }
        res.json(order);
    })
};