const express = require('express');
var router = express.Router();

var db = require('../libs/db.js');

var getByid = require('../tickets/get_byid.js');			//根据演出计划获取票（座位）信息
var buyTicket = require('../tickets/buy_ticket.js');		//购买票
var backTicket = require('../tickets/back_ticket.js');		//退票
var checkLock = require('../tickets/check_lock.js');		//检查票状态
var lockTicket = require('../tickets/lock_ticket.js');		//票加锁
var unlock = require('../tickets/unlock.js');				//解锁
var getAll = require('../tickets/getall.js');

router.get('/byid', function(req, res) {
	getAll(db, req.query.ticket_id, function(data) {
		res.send(data);
	})
});

router.get('/sched', function(req, res) {
	getByid(db, req.query.sched_id, function(data) {
		res.send(data);
	})
})

router.get('/lock', function(req, res) {
	var ticket_id = req.query.ticket_id;
	checkLock(db, req.query.ticket_id, function(data) {
		if(data.error) {
			res.send(data);
		}else {
			lockTicket(db, req.query.ticket_id, function(data) {
				res.send(data);
			})
		}
	})
})

router.get('/unlock', function(req, res) {
	unlock(db, req.query.ticket_id, function(data) {
		res.send(data);
	})
})

router.get('/buy', function(req, res) {
	var indenty = req.query.indenty;
	var dis = (new Date(req.query.start).getTime()) - (new Date().getTime());
	if(dis >= 20*60*1000) {
		if(indenty.type) {
			buyTicket(db, req.query.tobuy,  req.query.pay, req.query.one, indenty, function(data) {
					res.send(data);
			})
		}else {
			res.send({
				'error' : true,
				'result' : '用户未登录'
			})
		}
	}else {
		res.send({
			'error' : true,
			'result' : '开场前20分钟停止售票'
		})
	}
	
})

router.get('/back', function(req, res) {
	var indenty = req.query.indenty;
	console.log(indenty);
	var dis = (new Date(req.query.start).getTime()) - (new Date().getTime());
	if(dis >= 30*60*1000) {
		if(indenty) {
			backTicket(db, req.query.tobuy,  req.query.pay, req.query.one, indenty, function(data) {
					res.send(data);
			})
		}else {
			res.send({
				'error' : true,
				'result' : '用户未登录'
			})
		}
	}else {
		res.send({
			'error' : true,
			'result' : '距离开场仅有30分钟，禁止退票'
		})
	}
})

router.get('/checklock', function(req, res) {
	checkLock(db, req.query.ticket_id, function(data) {
		res.send(data);
	})
})

module.exports = router;
