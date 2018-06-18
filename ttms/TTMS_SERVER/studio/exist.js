var Exist = function(db, studio_name, callback) {
	var sql = 'SELECT studio_id FROM studio WHERE studio_name = ?';
	db.query(sql, [studio_name], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			console.log(data);
			if(data.length) {
				callback({
					'error' : true,
					'result' : '演出厅名称已存在',
					'data' : JSON.parse(JSON.stringify(data))
				})
			}else {
				callback({
					'error' : false,
					'result' : '演出厅名称不存在'
				})
			}
		}
	})
}

module.exports = Exist;