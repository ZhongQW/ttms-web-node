var checkTime = function (db, studio_id, start_time, play_id, callback) {
	var dis = new Date(start_time).getTime() - new Date().getTime();
	// console.log(new Date(start_time).toLocaleString(),new Date().toLocaleString(),dis);
	if(dis < 2 * 24 * 60 * 60 * 1000) {
		callback({
			'error' : true,
			'result' : '只能制定两天后的演出计划'
		})
		return ;
	}
	db.query('SELECT play_length FROM play WHERE play_id = ?', [play_id], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var length = JSON.parse(JSON.stringify(data))[0].play_length-0;
			// console.log(length);
			db.query('SELECT schedule.sched_time ,play.play_length FROM schedule,play WHERE studio_id = ? AND play.play_id = schedule.play_id ORDER BY sched_time',[studio_id], function(err, data) {
				var st = new Date(start_time).getTime();
				var end = st + (length+30) * 60 * 1000;			//加入过场时间
				if(err) {
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					var arr = [],cost = [], i,len = data.length,times = JSON.parse(JSON.stringify(data));
					for(i = 0; i < len; i ++) {
						var d = (new Date(''+times[i].sched_time).getTime());		//开始时间
						var c = d + (times[i].play_length-0+30)* 60 * 1000;			//对应结束时间
						arr.push(d);
						cost.push(c);
					}
					// console.log(arr, cost);
					if(arr.length) {
						OK(arr, st, end, cost,function(data) {
							// console.log(data);
							if(data.ok) {
								callback({
									'error' : false,
									'result' : 'ok'
								})
							}else {
								callback({
									'error' : true,
									'result' : data.result
								})
							}
						})
					}else {
						callback({
							'error' : false,
							'result' : 'ok'
						})
					}
				}
			})
		}
	})
}

function OK(arr, st, end, cost,callback) {
	console.log(arr, cost, st, end);
	var i,len = arr.length;
	if(end < arr[0] || st >=cost[len]){			//结束时间在第一个之前，开始时间在结束之后
		callback({
			'ok' :true
		})
		return;
	}
	for(i = 1; i < len; i ++) {
		if(st >= cost[i-1] && end <= arr[i]){
			callback({
				'ok' :true
			})
			return;
		}
	}
	if(st >= arr[len-1]) {
		callback({
			'ok' :true
		})
		return;
	}
	callback({
		'ok' :false,
		'result' : '建议添加在'+(new Date(arr[0]-(end-st)).Format("yyyy-MM-dd HH:mm:ss")) + '之前或者'+ (new Date(cost[len-1]).Format("yyyy-MM-dd HH:mm:ss"))+'之后'
	})
}


module.exports = checkTime;

Date.prototype.Format = function(fmt){  
    var o = {  
         "M+": this.getMonth()+1,  
         "d+": this.getDate(),  
         "H+": this.getHours(),  
         "m+": this.getMinutes(),  
         "s+": this.getSeconds(),  
         "S+": this.getMilliseconds()  
    };  
  
    if(/(y+)/.test(fmt)){  
        fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));  
    }  
    for(var k in o){  
        if (new RegExp("(" + k +")").test(fmt)){  
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));  
        }  
    }     
    return fmt;  
}  