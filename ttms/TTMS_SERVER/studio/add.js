var addStudio = function(db, name, row, col, introduction, callback) {
	var sql = 'INSERT INTO studio (studio_name, studio_row_count, studio_col_count, studio_introduction) VALUES (?,?,?,?);'
	var sq = 'SELECT studio_id FROM studio WHERE studio_name = ?';
	var base = 'INSERT INTO seat (studio_id, seat_row, seat_column) VALUES (?, ?, ?);'
	var ss = '';
	var can = [];
	var i ,j;
	db.query(sql, [name,row,col,introduction], function(err, data){
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			db.query(sq, [name], function(err, data) {
				if(err) {
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					var id = JSON.parse(JSON.stringify(data))[0].studio_id;
						for(i = 1; i <= row; i ++) {
							for(j = 1; j <= col; j ++){
								ss += base;
								can.push(id-0,i,j);
							}
						}
					db.query(ss, can, function(err,data) {
						if(err) {
							callback({
								'error' : true,
								'result' : '数据库出错'
							})
						}else {
							var qq = 'SELECT studio_id FROM studio WHERE studio_name = ?';
							db.query(qq, [name], function(err, data) {
								if(err) {
									callback({
										'error' : true,
										'result' : '数据库出错'
									})
								}else {
									callback({
										'error' : false,
										'result' : '演出厅添加成功',
										'id' : JSON.parse(JSON.stringify(data))[0]
									})
								}
							})
						}
					})
				}
			})
		}
	})
}

module.exports = addStudio;