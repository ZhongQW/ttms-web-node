window.onload = function() {
	var tofind = document.getElementsByClassName('find')[0];
	var id = document.getElementById('oSea');
	var oshow = document.getElementsByClassName('show')[0];
	var mname = document.getElementById('movname');
	var sname = document.getElementById('stuname');
	var seat = document.getElementById('seat');
	var sche_time = document.getElementById('time');
	var price = document.getElementById('price');
	var lock_time = document.getElementById('lock');
	var ticket_id = document.getElementById('ticket_id');
	var toback = document.getElementsByClassName('toback')[0];

	// var id = ;
	// id.value = sessionStorage.getItem('ticket_id') || '';
	tofind.addEventListener('click', function() {
		if(id.value) {
				$.ajax({
				'type' : 'get',
				'url' : 'http://localhost:8080/tickets/byid',
				data : {
					'ticket_id' : id.value
				},
				success : function(res) {
					console.log(res);
					if(res.error) {
						alert('出错：'+ res.result);
					}else {
						if(!res.result.length) {
							alert('该票不存在！');
						}else {
							ticket_id.innerHTML = res.result[0].ticket_id;
							toback.style.display = 'block';
							oshow.style.display = 'block';
							mname.innerHTML = res.result[0].play_name;
							sname.innerHTML = res.result[0].studio_name;
							seat.innerHTML = res.result[0].seat_row+ '排' + res.result[0].seat_column + '座';
							price.innerHTML = res.result[0].ticket_price;
							sche_time.innerHTML = new Date(res.result[0].sched_time).Format("yyyy-MM-dd HH:mm:ss");
							lock_time.innerHTML = new Date(res.result[0].ticket_locked_time).Format("yyyy-MM-dd HH:mm:ss")
						}
					}
				},
				error : function(res) {
					alert("出错："+ JSON.stringify(res));
				}	
			})	
		}else {
			alert('没有输入id');
		}
	})

	toback.addEventListener('click',function() {
		if(sessionStorage.getItem('indenty')) {
			$.ajax({
				type : 'get',
				url : 'http://localhost:8080/tickets/back',
				data :{
					'indenty' : sessionStorage.getItem('indenty'),
					'tobuy' : id.value,
					'pay' : price.innerHTML,
					'one' : price.innerHTML,
					'start' : sche_time.innerHTML
				},
				success : function(res) {
					// console.log(res);
					if(res.error) {
						alert(JSON.stringify(res.result));
					}else {
						alert('退票成功！');
						toback.style.display = 'none';
						oshow.style.display = 'none';
						id.value = '';
					}
				},
				error : function(res) {
					alert("出错："+ JSON.stringify(res));
				}
			})
		}else {
			alert('用户未登录!');
		}
		
	},false)
}

function search(id){
	$.ajax({
		'type' : 'get',
		'url' : 'http://localhost:8080/tickets/byid',
		data : {
			'ticket_id' : id
		},
		success : function(res) {
			if(res.error) {
				alert('出错：'+ res.result);
			}else {
				console.log(res.result);
			}
		},
		error : function(res) {
			alert("出错："+ JSON.stringify(res));
		}	
	})
}

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