var changeSeat = function(db, seats, seat_status, callback) {
	var ss = 'seat_id = ' + seats[0];
	for(var i = 1; i < seats.length; i ++) {
		ss += (' OR seat_id = ' + seats[i]);
	}
	var sql = 'UPDATE seat SET seat_status = ? WHERE '+ss;
	db.query(sql, [seat_status], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})	
		}else{
			callback({
				'error' : false,
				'result' : '修改成功'
			})
		}
	})
}

module.exports = changeSeat;