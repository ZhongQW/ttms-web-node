const express = require('express');
var router = express.Router();

var db = require('../libs/db.js');

var Exist = require('../users/exist.js');
var ExistID = require('../users/existID.js');
var Register = require('../users/register.js');
var Login = require('../users/login.js');
var Changepass = require('../users/change_pass.js');
var getAll = require('../users/getall.js');
var delUser = require('../users/deluser.js');
var resUser = require('../users/resuser.js');


//用户注册
router.use('/reg', function(req, res) {
	// console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	var type = req.body.identity;
	Exist(db, username, function (data) {
		if(data.error) {
			res.send(data);
		}else {
			Register(db, username, password, type, function (data) {
				res.send(data);
			})
		}
	})
})

//用户登录
router.use('/log', function(req, res) {
	// console.log('login:',req.body);
	var username = req.body.username;
	var password = req.body.password;
	var type = req.body.identity;
	Exist(db, username, function(data) {
		if(!data.error) {
			res.send({
				'error' : true,
				'result' : '用户不存在'
			})
		}else {
			Login(db, username, password,type, function (data) {
				if(data.error) {
					res.send(data);
				}else {
					req.session.user = username;
					res.cookie('user',username ,{ maxAge :20*60*1000, signed : true});
					res.send(data)
				}
			})
		}	
	})
})

//更改密码
router.use('/chpass', function(req, res) {
	var id = req.body.id;
	var oldVal = req.body.oldVal;
	var newVal = req.body.newVal;
	console.log(req.session.user);
	Changepass(db, id, oldVal, newVal, function(data) {
		res.send(data);
	}) 
})

router.use('/all', function(req, res) {
	getAll(db, function(data) {
		res.send(data);
	}) 
})

router.use('/del', function(req, res) {
	ExistID(db, req.query.user_ID, function (data) {
		if(data.error) {
			delUser(db, req.query.user_id, function(data) {
				res.send(data);
			}) 
		}else {
			res.send({
				'error' : true,
				'result' : '用户不存在'
			})
		}
	})
})

router.use('/res', function(req, res) {
	ExistID(db, req.query.user_ID, function (data) {
		if(data.error) {
			resUser(db, req.query.user_id, function(data) {
				res.send(data);
			}) 
		}else {
			res.send({
				'error' : true,
				'result' : '用户不存在'
			})
		}
	})
})

module.exports = router;