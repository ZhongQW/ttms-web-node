var getPandSched = function(db, sched_id, callback) {
	var sql = 'SELECT play.* , schedule.sched_time,schedule.sched_ticket_price, studio.studio_name,studio.studio_id FROM play, schedule, studio WHERE play.play_id = schedule.play_id AND schedule.sched_id = ? AND studio.studio_id = schedule.studio_id;'
	db.query(sql, [sched_id], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var info = JSON.parse(JSON.stringify(data));
			db.query('SELECT * FROM studio', function(err, data) {
				if(err) {
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					var studios = JSON.parse(JSON.stringify(data));
					db.query('SELECT * FROM play WHERE play_status <> 2', function(err, data) {
						if(err) {
							callback({
								'error' : true,
								'result' : '数据库出错'
							})
						}else {
							callback({
								'error' : false,
								'result' : info,
								'studios' : studios,
								'plays' : JSON.parse(JSON.stringify(data))
							})
						}
					})
				}
			})
		}
	})
}

module.exports = getPandSched;