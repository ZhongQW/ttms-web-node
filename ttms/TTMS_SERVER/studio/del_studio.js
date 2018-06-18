var Delstudio = function(db, id, callback) {
	var sql = 'DELETE FROM studio WHERE studio_id = ?;';
	db.query(sql, [id], function(err, data) {
		console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : '删除演出厅成功'
			})
		}
	})
} 

module.exports = Delstudio;