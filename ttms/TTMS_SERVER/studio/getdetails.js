var getDetails = function(db, id, callback) {
	var sql = 'SELECT * FROM studio WHERE studio_id = ?';
	db.query(sql, function(err, data) {
		if(err) {
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

module.exports = getDetails;