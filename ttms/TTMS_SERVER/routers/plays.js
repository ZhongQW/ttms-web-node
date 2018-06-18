const express = require('express');
var router = express.Router();

var db = require('../libs/db.js');

var Existplays = require('../plays/exist_palys.js');		//检查是否存在
var Addplays = require('../plays/add_plays.js');			//添加剧目
var Delplays = require('../plays/del_plays.js');			//下线
var Checkplays = require('../plays/check_plays.js');		//检查剧目
var Getplays = require('../plays/get_plays.js');			//获取所有剧目
var onlinePlays = require('../plays/online_plays.js');		//上线
var Bytype = require('../plays/type_plays.js');				//按照type 
var getPsched = require('../shedule/get_psched.js');			//获取剧目的演出计划
var updPlays = require('../plays/update_plays.js');			//修改剧目信息
var getCount = require('../plays/getcount.js');


router.use('/count', function(req, res) {
	getCount(db, function(data){
		res.send(data);
	})
})

//添加剧目
router.use('/add', function(req, res) {
	var playinfo = req.body;
	Addplays(db,playinfo,function(data){
		res.send(data);
	})
})

//上线剧目
router.use('/online', function (req, res) {
	onlinePlays(db, req.query.play_id, function(data) {
		res.send(data);
	})
})

//下线剧目
router.use('/outline', function(req, res) {
	var id = req.query.play_id;
	Delplays(db,id,function (data) {
		res.send(data);
	})
})

//按名称或者id查询剧目
router.use('/check', function(req, res) {
	var name = req.query.name;
	var id = req.query.id;
	Checkplays(db, id, name, function (data) {
		res.send(data);
	})
})

//更改剧目信息
router.use('/upd', function(req, res) {
	updPlays(db, req.query.info, function(data) {
		res.send(data);
	})
})

//获取所有剧目 
router.use('/get', function(req, res) {
	Getplays(db, function(data) {
		res.send(data);
	})
})

//获取类型剧目
router.use('/type', function(req, res) {
	Bytype(db, req.query.type, function(data) {
		res.send(data);
	})
})

//获取剧目的演出计划
router.use('/psched', function(req, res) {
	getPsched(db, req.query.play_id, function(data) {
		res.send(data);
	})
})
module.exports = router;