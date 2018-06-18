var buyTicket = function(db, arr, pay, one, indenty, callback) {
	var ss = 'ticket_id = ' + arr[0];
	for(var i = 1; i < arr.length; i ++) {
		ss += (' OR ticket_id = ' + arr[i]);
	}
	var sql = 'UPDATE ticket SET ticket_status = 2 ,ticket_locked_time = now() WHERE ' + ss;
	db.query(sql, function(err, data) {
		// console.log(data);
		if(err){
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			// for(i = 0; i < arr.length; i ++)
			db.query('INSERT INTO sale (user_id, sale_payment, sale_change, sale_type, sale_status) VALUES (?,?,0,1,1);SELECT LAST_INSERT_ID();', [indenty.user_id, pay], function(err, data) {
				var sarr = JSON.stringify(data).split(':');
				var sale_id = sarr[sarr.length-1].split('}')[0]
				if(err) {
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					var base = 'INSERT INTO sale_item (ticket_id,sale_ID, sale_item_price) VALUES (?,?,?);';
					var ns = ''+base;
					var params = [arr[0], sale_id, one];
					for(var i = 1; i < arr.length; i ++) {
						ns += base;
						params.push(arr[i], sale_id, one);
					}
					db.query(ns, params, function(err, data) {
						if(err) {
							callback({
								'error' : true,
								'result' : '数据库出错'
							})
						}else {
							callback({
								'error' : false,
								'result' : '售票成功'
							})
						}
					})

				}
			})
		}
	})
}

module.exports = buyTicket;