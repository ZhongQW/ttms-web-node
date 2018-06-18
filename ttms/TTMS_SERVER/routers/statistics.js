const express = require('express');
var router = express.Router();

var db = require('../libs/db.js');

// var getAll = require('../Sales_statistics/getAll.js');
// var getOne = require('../Sales_statistics/getOne.js');
var getAllSale = require('../Sales_statistics/getAllSale.js');

//查询所有的剧目信息
// router.get('/all',function(req,res){
//     getAll(db,function(data) {
//         res.send(data);
//     })
// });

//查询指定的剧目详情
// router.get('/one',function(req,res){
//     getOne(db,req.sale_ID,function(data){
//         res.send(data);
//     })
// });

//查询所有售票员的销售记录
router.get('/alsler',function(req,res){
    getAllSale(db,function(data){
        res.send(data);
    })
});

module.exports = router;
