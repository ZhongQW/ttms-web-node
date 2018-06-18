var Getall = function(db, callback) {
	var sql = 'SELECT schedule.*, studio.studio_name, play.play_name, play.play_length ,play.play_image, play.play_status FROM schedule, studio, play WHERE schedule.studio_id = studio.studio_id AND play.play_id = schedule.play_id  ORDER BY studio_id ,sched_time;'
	var ss = 'SELECT COUNT(studio_id) AS count FROM studio ORDER BY studio_id;';
	db.query(sql, function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var info = JSON.parse(JSON.stringify(data))
			db.query(ss, function(err, data) {
				if(err) {
					callback({
						'error' : true,
						'result' : "数据库出错"
					})
				}else {
					var count = JSON.parse(JSON.stringify(data))[0].count;
					db.query('SELECT * FROM studio', function(err, data) {
						if(err) {
							callback({
								'error' : true,
								'result' : "数据库出错"
							})
						}else {
						callback({
							'error' : false,
							'result' : info,
							'count' : count,
							'studios' : JSON.parse(JSON.stringify(data))
							})
						}
					})
				}
				
			})
			
		}
	})
}

module.exports = Getall;