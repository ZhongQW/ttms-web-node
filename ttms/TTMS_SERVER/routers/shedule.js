const express = require('express');
var router = express.Router();

var db = require('../libs/db.js');

var addShed = require('../shedule/add.js');
var checkTime = require('../shedule/check_time.js');
var getAll = require('../shedule/get_all.js');
var changeSched = require('../shedule/change_sched.js');
var getPandSched = require('../shedule/get_pandsched.js');
var getSchedone = require('../shedule/get_schedone.js');

router.get('/getone', function(req,res) {
	getSchedone(db, req.query.sched_id, function(data) {
		res.send(data);
	})
})

//添加计划添加
router.get('/add',function(req, res) {
	checkTime(db, req.query.studio_id, req.query.sched_time, req.query.play_id, function(data) {
		if(data.error) {
			res.send(data);
		}else {
			addShed(db, req.query.studio_id, req.query.play_id, req.query.sched_time,req.query.price, function(data) {
				res.send(data);
			})
		}
	})

})

//更新计划
router.get('/upd',function(req, res) {
	console.log(req.query);
	 changeSched(db, req.query.sched_id, req.query.info, function(data) {
	 	res.send(data);
	 })
})

//删除计划
router.get('/del',function(req, res) {

})

//获取所有计划
router.get('/all', function(req, res) {
	getAll(db, function(data) {
		res.send(data);
	})
})

router.get('/gpas', function(req, res) {
	getPandSched(db, req.query.sched_id, function(data) {
		res.send(data);
	})
})

//获取
module.exports = router;