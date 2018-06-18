var resUser = function(db, id, callback){
	console.log(id);
	// var mm = '' + 123456;
	var sql =" UPDATE users SET password = \'123456\' WHERE userID = ?";
	db.query(sql, [id], function(err, data) {
		if(err){
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' :'重置密码成功。初始密码为123456'
			})
		}
	})
}

module.exports = resUser;