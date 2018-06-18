//根据演出计划传票（座位信息，演出信息）
var getByid = function(db, sched_id, callback) {
	var sql = 'SELECT ticket.*, seat.*, studio.studio_name, studio.studio_row_count, studio.studio_col_count, schedule.sched_time, schedule.sched_ticket_price, play.play_name, play.play_length FROM ticket, seat, studio, schedule, play WHERE ticket.sched_id = ? AND seat.seat_id = ticket.seat_id AND studio.studio_id = seat.studio_id AND schedule.sched_id = ticket.sched_id AND play.play_id = schedule.play_id';
	db.query(sql, [sched_id], function(err, data) {
		// console.log(err);
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

module.exports = getByid;