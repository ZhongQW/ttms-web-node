var backTicket = function(db, arr, pay, one, indenty, callback) {
	var sql = 'UPDATE ticket SET ticket_status = 0 ,ticket_locked_time = now() WHERE ticket_id = ?';
	db.query(sql, [arr],function(err, data) {
		console.log(err,data);
		if(err){
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			db.query('INSERT INTO sale (user_id, sale_payment, sale_change, sale_type, sale_status) VALUES (?,?,0,0,0);SELECT LAST_INSERT_ID();', [indenty.user_id, 0-pay], function(err, data) {
				var sarr = JSON.stringify(data).split(':');
				var sale_id = sarr[sarr.length-1].split('}')[0]
				console.log(err,data);

				if(err) {
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					var base = 'INSERT INTO sale_item (ticket_id,sale_ID, sale_item_price) VALUES (?,?,?);';
					var ns = ''+base;
					var params = [arr[0], sale_id, 0-one];
					for(var i = 1; i < arr.length; i ++) {
						ns += base;
						params.push(arr[i], sale_id, one);
					}
					db.query(ns, params, function(err, data) {
					console.log(err,data);

						if(err) {
							callback({
								'error' : true,
								'result' : '数据库出错'
							})
						}else {
							callback({
								'error' : false,
								'result' : '退票成功'
							})
						}
					})

				}
			})
		}
	})
}

module.exports = backTicket;