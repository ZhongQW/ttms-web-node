var login = function (db, username, password, type,callback) {
	var sql = 'SELECT * FROM users WHERE `username` = ? AND type = ?';
	db.query(sql, [username,type], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			if(data.length) {
				var info = JSON.parse(JSON.stringify(data))[0];
				var pass = info.password;
				if(pass !== password) {
					callback({
						'error' : true,
						'result' : '密码错误'
					});
				}else {
					callback({
						'error' : false,
						'result' : '登录成功',
						'indenty' : {
							'user_id' : info.userID,
							'type' : info.type
						}
					})
				}
			}else {
				callback({
					'error' :true,
					'result' : '身份出错'
				})
			}
			
		}
	})
}

module.exports = login;