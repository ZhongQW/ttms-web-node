var existID = function (db,id, callback) {
	var sql = 'SELECT `username` FROM users WHERE userID = ? ';
	db.query(sql, [id], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			if(data.length === 0){
				callback({
					'error' : true,
					'result' : '用户不存在'
				})
			}else {
				callback({
					'error' : false,
					'result' : '用户已存在'
				})
			}
		}
	})
}

module.exports = existID;