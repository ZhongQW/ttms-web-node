var delUser = function(db, id, callback){
	var sql = 'DELETE FROM users WHERE userID = ?';
	db.query(sql, [id], function(err, data) {
		if(err){
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' :'删除成功'
			})
		}
	})
}

module.exports = delUser;