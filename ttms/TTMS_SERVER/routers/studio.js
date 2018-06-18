const express = require('express');
var router = express.Router();

var db = require('../libs/db.js');

var exist = require('../studio/exist.js');
var add = require('../studio/add.js');
var getAll = require('../studio/getall.js');
var getDetails = require('../studio/getdetails.js');
var delStudio = require('../studio/del_studio.js');
var getSeat = require('../studio/get_seat.js');

router.get('/add', function(req,res) {
	// console.log(req.query);
	var name = req.query.studio_name;
	var row = req.query.studio_row_count;
	var col = req.query.studio_col_count;
	var intro = req.query.studio_introduction;
	exist(db, name,function(data) {
		if(data.error) {
			res.send(data);
		}else {
			add(db, name, row, col, intro, function(data){
				res.send(data);
			})
		}
	})
})

router.get('/all', function(req,res) {
	getAll(db,function(data) {
		res.send(data);
	})
})

router.get('/details', function(req,res) {
	getDetails(db, req.query.studio_id, function(data) {
		res.send(data);
	})
})

router.get('/del', function(req,res) {
	delStudio(db, req.query.studio_id, function(data) {
		res.send(data);
	})
})

router.get('/seat', function(req, res) {
	getSeat(db, req.query.studio_id, function(data) {
		res.send(data);
	})
})
module.exports = router;