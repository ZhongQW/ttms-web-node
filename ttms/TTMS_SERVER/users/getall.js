var getAll = function(db, callback){
	var sql = 'SELECT userID,username,type FROM users WHERE type <> 1 order by type';
	db.query(sql,function(err, data) {
		console.log(err,data);
		if(err){
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : JSON.parse(JSON.stringify(data))
			})
		}
	})
}

module.exports = getAll;