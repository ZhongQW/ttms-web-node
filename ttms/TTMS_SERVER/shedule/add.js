var addSchedule = function(db, studio_id, play_id, sched_time, price, callback) {
	var sql = 'INSERT INTO schedule (studio_id, play_id, sched_time, sched_ticket_price) VALUES (?,?,?,?);'
	db.query(sql, [studio_id, play_id, sched_time, price], function(err, data) {
	console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : '添加演出计划数据库出错'
			})
		}else {
			db.query('SELECT seat.*,schedule.sched_id FROM seat, schedule WHERE seat.studio_id = ? AND schedule.play_id = ? AND schedule.sched_time = ?;',[studio_id, play_id, sched_time], function(err,data) {
			// console.log(err);
				if(err) {
					callback({
						'error' : true,
						'result' : '选出座位、计划id数据库出错'
					})
				}else {
					var ss = '', params = [];
					var base = 'INSERT INTO ticket (seat_id, sched_id, ticket_price, ticket_status) VALUES (?,?,?,0);'; 
					var seats = JSON.parse(JSON.stringify(data));
					var i,len = seats.length;
					for(i = 0; i < len; i ++) {
						ss += base;
						params.push(seats[i].seat_id,seats[i].sched_id, price);
					}
					db.query(ss, params, function(err, data) {
					// console.log(err);
						if(err) {
							callback({
								'error' : true,
								'result' : '生成票数据库出错'
							})
						}else {
							db.query('SELECT * FROM play WHERE play_id = ?',[play_id], function(err, data) {
								if(err) {
									callback({
										'error' : true,
										'false' : '数据库出错'
									})
								}else {
									callback({
										'error' : false,
										'result' : '添加演出计划成功',
										'pinfo' : JSON.parse(JSON.stringify(data))
									})
								}
							})
						}
					})
				}
			})	
		}
	})
}	

module.exports = addSchedule;
