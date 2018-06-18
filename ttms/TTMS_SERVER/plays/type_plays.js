var Typeplays = function(db, type, callback) {
	var sql = 'SELECT * FROM play WHERE play_status = ?';
	db.query(sql, [type], function(err, data) {
		console.log(err,data);
		if(err) {
			callback({
				'error' :  true,
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

module.exports = Typeplays;