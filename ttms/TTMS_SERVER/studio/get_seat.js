var getSeat = function(db, id, callback) {
	db.query('SELECT * FROM seat WHERE studio_id = ?', [id], function(err,data) {
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

module.exports = getSeat;