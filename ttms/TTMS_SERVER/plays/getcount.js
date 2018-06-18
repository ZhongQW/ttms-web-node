var getCountplays = function(db, callback) {
	var sql = 'SELECT Count(play.play_id) AS count,play.play_name,play.play_image,schedule.play_id,sale_item.sale_ID, ticket.sched_id FROM play, schedule,ticket,sale_item WHERE sale_item.ticket_id = ticket.ticket_id AND ticket.sched_id = schedule.sched_id AND schedule.play_id = play.play_id group by play.play_id order by count desc;'
	db.query(sql, function(err, data) {
		console.log(err, data);
		if(err){
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

module.exports = getCountplays;