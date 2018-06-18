var getSeat = function(db, studio_id, callback) {
	var sql = 'SELECT seat.*, studio.studio_name, studio.studio_row_count, studio_col_count FROM seat,studio WHERE studio.studio_id = ? AND seat.studio_id = ?';
	db.query(sql, [studio_id,studio_id], function(err, data) {
		console.log(err,data);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})	
		}else{
			callback({
				'error' : false,
				'result' : JSON.parse(JSON.stringify(data))
			})
		}
	})
}

module.exports = getSeat;