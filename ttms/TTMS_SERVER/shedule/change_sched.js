var changeSched = function(db, sched_id, info, callback) {
	db.query( 'SELECT schedule.studio_id FROM schedule WHERE sched_id = ?', [sched_id],  function(err,data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var stu_id = JSON.parse(JSON.stringify(data))[0].studio_id;
			console.log(stu_id,info.studio_id);
			var sql = ''
			if(stu_id !== info.studio_id) {
				sql = 'UPDATE schedule SET studio_id = ?, play_id = ?, sched_time = ?, sched_ticket_price = ? WHERE sched_id = ?;DELETE FROM ticket WHERE sched_id = ?;'
				db.query(sql, [info.studio_id, info.play_id, info.sched_time, info.sched_ticket_price, sched_id, sched_id], function(err, data) {
					if(err) {
						callback({
							'error' : true,
							'result' : '数据库出错'
						})
					}else {
						db.query('SELECT seat_id FROM seat WHERE studio_id = ?', [stu_id], function(err, data) {
							if(err) {
								callback({
									'error' : true,
									'result' : '数据库出错'
								})
							}
							var ss = '', params = [];
							var base = 'INSERT INTO ticket (seat_id, sched_id, ticket_price, ticket_status) VALUES (?,?,?,0);'; 
							var seats = JSON.parse(JSON.stringify(data));
							var i,len = seats.length;
							for(i = 0; i < len; i ++) {
								ss += base;
								params.push(seats[i].seat_id, sched_id, info.sched_ticket_price);
							}
							db.query(ss, params, function(err, data) {
								// console.log(err);
								if(err) {
									callback({
										'error' : true,
										'result' : '生成票数据库出错'
									})
								}else {
									callback({
										'error' : false,
										'result' : '修改演出计划成功'
									})
								}
							})
						})
					}
				})
			}else {
				db.query('UPDATE schedule SET sched_id = ?, studio_id = ?, play_id = ?, sched_time = ? WHERE sched_id = sched_id;UPDATE ticket SET ticket_price = ? wWHERE sched_id = ?;', [sched_id,info.sched_ticket_price,sched_id], function(err, data) {
					if(err) {
						callback({
							'error' : true,
							'result' : '数据库出错'
						})
					}else {
						callback({
							'error' : false,
							'result' : '修改演出计划成功'
						})
					}
				})
			}
		}
	})
	
}

module.exports = changeSched;