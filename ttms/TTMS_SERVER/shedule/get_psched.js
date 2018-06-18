var getPsched = function(db, play_id, callback) {
	var sql = 'SELECT schedule.*, studio.studio_name FROM schedule, studio WHERE schedule.studio_id = studio.studio_id AND schedule.play_id = ?;';
	db.query(sql, [play_id, play_id], function(err,data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var info = JSON.parse(JSON.stringify(data));
			db.query('SELECT * FROM play WHERE play_id = ?',[play_id],function(err,data) {
				if(err) {
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					callback({
						'error' : false,
						'result' : info,
						'info' : JSON.parse(JSON.stringify(data))
					})
				}
			})
		}
	})
}

module.exports = getPsched;