var onlinePlays = function(db, id, callback) {
	var sql = 'UPDATE `play` SET play_status = 1 WHERE `play_id` = ?'
	db.query(sql, [id], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : '剧目上线成功'
			})
		}
	})
}

module.exports = onlinePlays;