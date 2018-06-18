var getOne = function(db, sched_id, callback){
	var sql = 'SELECT play.* ,schedule.sched_time,ticket.ticket_price,seat.seat_status,seat.seat_column,studio.studio_name FROM studio, schedule, ticket, seat,play WHERE play.play_id = schedule.play_id AND schedule.sched_id = ? AND ticket.sched_id = schedule.sched_id AND seat.seat_id = ticket.seat_id;'
	console.log(sched_id);
	db.query(sql, [sched_id], function(err,data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : JSON.parse(JSON.stringify(data))
			})
		}
	})
}

module.exports = getOne;