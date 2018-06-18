var checkLock = function(db, ticket_id, callback) {
	db.query('SELECT ticket_status , ticket_locked_time FROM ticket WHERE ticket_id = ?', [ticket_id], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var ticket = JSON.parse(JSON.stringify(data))[0];
			if(ticket.ticket_status == 0) {
				callback({
					'error' : false,
					'result' : '票可售'
				})
			}else {
				var time = (new Date().getTime() - new Date(ticket.ticket_locked_time).getTime());
				if(time > 15 * 60 * 1000) {
					callback({
						'error' : false,
						'result' : '票可售'
					})
				}else {
					callback({
						'error' : true,
						'result' : '票不可售'
					})
				}
			}
		}
	})
}

module.exports = checkLock;