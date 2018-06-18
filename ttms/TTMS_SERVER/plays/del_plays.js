// 下线
var delPlays = function (db, id, callback) {
	var sql = 'UPDATE `play` SET play_status = 2 WHERE `play_id` = ?';
	db.query(sql, [id], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : '下线剧目成功'
			})
		}
	})
}

module.exports = delPlays;