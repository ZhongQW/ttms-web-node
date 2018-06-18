window.onload = function() {
	var play_id = sessionStorage.getItem("play_id");
	var seat = document.getElementsByClassName('s-seat')[0];
	$.ajax({
			type:"get",
			url: "http://localhost:8080/plays/psched",
			data : {
				play_id : play_id
			},
			success : function(res) {
				console.log(res);
				
				if(res.error) {
					alert('出错：'+ res.result);
				}else {
					var i, len = res.result.length;
					
					var img = document.getElementsByClassName('ps-img')[0];
					img.style.background = 'url(\'../../img/' + res.info[0].play_image.split('\\')[2] + '\') no-repeat';
	            	img.style.backgroundPosition = 'center';
	            	img.style.backgroundSize = '100% 100%';
	            	document.getElementById('name').innerHTML = res.info[0].play_name;
	            	document.getElementById('type').innerHTML = ntoType(res.info[0].play_type_id);
	            	document.getElementById('length').innerHTML = res.info[0].play_length +'分钟 / '+ ntoLang(res.info[0].play_lang_id);
	            	document.getElementById('intor').innerHTML = res.info[0].play_introduction;
					
					for( i = 0; i < len; i ++) {
						var oLi = document.createElement('div');
						oLi.className = 's-li';
						var oCvr = document.createElement('div');
						oCvr.className = 's-cover';
						oLi.sched_id = res.result[i].sched_id;
						var oStu = document.createElement('div');
						oStu.className = 's-studio';
						oStu.innerHTML = res.result[i].studio_name;
						var oTime = document.createElement('div');
						oTime.className = 's-time';
						oTime.innerHTML = new Date(res.result[i].sched_time).Format("yyyy-MM-dd HH:mm:ss");
						oCvr.appendChild(oStu);
						oCvr.appendChild(oTime);

						var oCost = document.createElement('div');
						oCost.className = 's-cost';
						oCost.innerHTML = '￥'+res.result[i].sched_ticket_price +'元';

						var oBuy = document.createElement('div');
						oBuy.className = 's-buy';
						oBuy.innerHTML = '选座购票';
						oBuy.addEventListener('click', selSeat, false);
						oLi.appendChild(oCvr);
						oLi.appendChild(oCost);
						oLi.appendChild(oBuy);

						seat.appendChild(oLi);
					}
				}
			},
			error : function(res) {
				alert("出错："+ JSON.stringify(res));
			}
		})
}

//数字转语言
function ntoLang(val) {
    var lang;
    switch (val) {
        case 0:
                lang = '国语';
                break;
        case 1:
                lang = '粤语';
                break;
        case 2:
                lang = '英语';
                break;
        case 3:
                lang = '韩语';
                break;
        case 4:
                lang = '日语';
                break;
        default:
                lang = '国语';
    }
    return lang;
}

//数字转剧目状态
function ntoStatus(val) {
    var status;
    switch (val) {
        case 0:
            status = '待安排演出';
            break;
        case 1:
            status = '已安排演出';
            break;
        case 2:
            status = '下线';
            break;
        default:
            status = '待安排演出';
    }
    return status;
}

//数字转类型
function ntoType(val) {
    var type ;
    switch (val) {
        case 0:
            type = '动作片';
            break;
        case 1:
            type = '喜剧片';
            break;
        case 2:
            type = '恐怖片';
            break;
        case 3:
            type = '家庭片';
            break;
        case 4:
            type = '科技片';
            break;
        case 5:
            type = '动画片';
            break;
    }
    return type;
}

function selSeat(e) {
	var sched_id = e.target.parentNode.sched_id;
	// alert(sched_id);
	sessionStorage.setItem('sched_id',sched_id);
	window.location = '../../ticket/ticket.html';
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