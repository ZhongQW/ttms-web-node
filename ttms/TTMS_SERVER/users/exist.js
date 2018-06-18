var exist = function (db,username, callback) {
	var sql = 'SELECT `userID` FROM users WHERE username = \'' + username +'\'';
	db.query(sql, function(err, data) {
		// console.log('exist',err,data);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var myData = JSON.parse(JSON.stringify(data));
			if(myData.length === 0){
				callback({
					'error' : false,
					'result' : '用户不存在'
				})
			}else {
				callback({
					'error' : true,
					'result' : '用户已存在'
				})
			}
		}
	})
}

module.exports = exist;