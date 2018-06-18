const express = require('express');
var router = express.Router();

var db = require('../libs/db.js');

var getSeat = require('../seat/get_seat.js');
var changeSeat = require('../seat/change_seat.js');

router.use('/get',function(req, res) {
	console.log(req.query);
	getSeat(db, req.query.stu_id, function(data) {
		res.send(data);
	})
})

router.use('/change',function(req, res) {
	changeSeat(db, req.query.seats, req.query.seat_status, function(data) {
		res.send(data);
	})
})

module.exports = router;