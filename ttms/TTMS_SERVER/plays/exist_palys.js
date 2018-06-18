var existPlays = function(db, id, name, callback) {
	sql = 'SELECT `play_id` FROM paly WHERE `play_id` = ' + id  + 'or `play_name` = \'' + name +'\'';
	db.query(sql, function(err, data) {
		if(err) {
			callback({
				'error' :true,
				'result' : '数据库出错'
			})
		}else {
			if(0 === JSON.parse(JSON.stringify(data)).length) {
				callback({
					'error' : false,
					'result' : '剧目不存在'
				})
			}else {
				callback({
					'error' : true,
					'result' : '剧目已存在'
				})
			}
		}
	})
}

module.exports = existPlays;