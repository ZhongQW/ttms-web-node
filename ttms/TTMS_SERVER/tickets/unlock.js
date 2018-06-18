var unlock = function(db, ticket_id, callback){
	db.query('UPDATE ticket SET ticket_status = 0, ticket_locked_time = now() WHERE ticket_id = ?',[ticket_id], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : '解锁ok'
			})
		}
	})
}

module.exports = unlock;