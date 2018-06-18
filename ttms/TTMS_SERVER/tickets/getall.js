var getall = function(db, id, callback) {
	var sql = 'SELECT ticket.*,play.play_name,studio.studio_name , schedule.sched_time,seat.seat_row,seat.seat_column FROM ticket,schedule,play,studio,seat WHERE ticket.ticket_status = 2 AND play.play_id = schedule.play_id AND schedule.sched_id = ticket.sched_id AND studio.studio_id = schedule.studio_id AND ticket.ticket_id = ? AND seat.seat_id = ticket.seat_id'
	db.query(sql,[id], function(err,data) {
		console.log(err, data);
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

module.exports = getall;