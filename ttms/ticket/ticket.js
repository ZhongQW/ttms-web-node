window.onload = function() {
	//确定演出计划选择座位  获取票(～o￣3￣)～
	//var studio = sessionStorage.getItem('now');
	var len, aCols = [], sCols =[], price;
	var sched_id = sessionStorage.getItem('sched_id');
    var indenty = JSON.parse(sessionStorage.getItem('indenty'));
    console.log(indenty);
	var oTime = document.getElementById('time');
	var oStudio = document.getElementsByClassName('s-studio')[0];
	var oDetail = document.getElementsByClassName('s-detail')[0];

	var pName , pLength, sName, count = 0;

	var osName = document.getElementById('studio');
	var osTime = document.getElementById('time');
	var oSel = document.getElementsByClassName('e-seled')[0];
	var oCount = document.getElementById('num');
	var oPay= document.getElementById('pay');
	var oOne = document.getElementById('one');
	var oPlay = document.getElementById('play');
	var oCost = document.getElementById("cost");
	var opLen = document.getElementById("length");

	function animate() {
		oTime.innerHTML = (new Date()).toLocaleString();
		window.requestAnimationFrame(animate);
	}
	window.requestAnimationFrame(animate);
	get(count,sched_id,oPlay,pLength,osName,price,oOne,oCount,oStudio,oDetail,oTime,oPay,oCost,opLen,sCols);

	var oSub = document.getElementById('sub');
	oSub.addEventListener('click',function(){
        // console.log(sessionStorage.getItem('indenty'));
        if(sessionStorage.getItem('indenty')) {
            var sCols = document.getElementsByClassName("s-one");
            var len = sCols.length, i, tobuy =[], arr = [];
            for(i = 0; i < len; i ++) {
                tobuy.push(sCols[i].ticket_id);
            }

            if(tobuy.length) {
                 var data = {
                    tobuy : tobuy,
                    indenty :indenty,
                    pay: oPay.innerHTML,
                    one : oOne.innerHTML.slice(0,-1),
                    start : cost.innerHTML
                 }
                 // if(indenty.type == 2) {
                 //    sessionStorage.setItem('data',JSON.stringify(data));
                 //    window.location = '../nomarl_user/pay/pay.html';
                 //    return;
                 // }
                $.ajax({
                    type:"get",
                    url: "http://localhost:8080/tickets/buy",
                    data : {
                        tobuy : tobuy,
                        indenty :indenty,
                        pay: oPay.innerHTML,
                        one : oOne.innerHTML.slice(0,-1),
                        start : cost.innerHTML
                    },
                    success : function(res) {
                        if(res.error) {
                            alert('出错：'+ res.result);
                        }else {
                            alert(res.result);
                            // if(indenty.type == 2) {
                            //     window.location = '../nomarl_user/pay/pay.html';
                            // }else {
                                location.reload();
                            // }
                        }
                    },
                    error : function(res) {
                        alert("出错："+ JSON.stringify(res));
                    }
                })
            }else {
                alert('未选座位!');
            }
            
        }else {
            alert('用户未登录！');
        }
    },false)
		
}

function get(count,sched_id,oPlay,pLength,osName,price,oOne,oCount,oStudio,oDetail,oTime,oPay,oCost,opLen,sCols){
	console.log(sched_id);
        $.ajax({
		type: "get",
        url: "http://localhost:8080/tickets/sched",
        data : {
        	sched_id : sched_id
        },
        success: function(res) {
        	console.log(res);
        	if(res.error) {	
        		alert('出错：'+res.result);
        	}else {
        		var col = res.result[0].studio_col_count;
        		var row = res.result[0].studio_row_count;
        		oPlay.innerHTML = res.result[0].play_name;
        		pLength = res.result[0].play_length;
        		osName.innerHTML = res.result[0].studio_name + '演出厅';
        		price = res.result[0].ticket_price;
        		oOne.innerHTML = res.result[0].ticket_price + '元';
        		oCount.innerHTML = count;
        		oPay.innerHTML = 0;
        		oCost.innerHTML = new Date(res.result[0].sched_time).Format("yyyy-MM-dd HH:mm:ss");
                oCost.innerHTML = hhh(res.result[0].sched_time);
        		opLen.innerHTML = res.result[0].play_length + '分钟';
        		for(var i = 1; i <= row; i ++) {
        			var oRow = document.createElement("div");
        			oRow.className = "s-row";
        			var oIndex = document.createElement("div");
        			oIndex.className = "s-index";
        			oIndex.innerHTML = i;
        			var oMain = document.createElement("div");
        			oMain.className = "s-main";

        			for(var j = 1; j <= col; j ++) {
        				var oCol = document.createElement("div");
        				oCol.className = "s-col";
        				oCol.innerHTML = j;
        				oCol.seatinfo = res.result[j+10*(i-1)-1];
        				oCol.sel = 0;
        				if(res.result[j+10*(i-1)-1].seat_status === 0) {
        					oCol.origin = oCol.className = 's-bad';
        				} else if(res.result[j+10*(i-1)-1].ticket_status === 1) {
        					oCol.origin = oCol.className = "s-locked";
        				} else if(res.result[j+10*(i-1)-1].ticket_status === 2) {
                            oCol.origin = oCol.className = "s-saled";
                        }else if(res.result[j+10*(i-1)-1].seat_status === 1){
                            oCol.origin = oCol.className = "s-col";
                        }else {
                            oCol.origin = oCol.className = 's-emp';
                        }
        				oMain.appendChild(oCol);
        			}
        			oRow.appendChild(oIndex);
        			oRow.appendChild(oMain);
        			oStudio.appendChild(oRow);
        		}
        		aCols = document.getElementsByClassName('s-col');
        		var i, alen = aCols.length;
        		//给可出售座位添加事件
        		for(i = 0; i < alen; i ++) {
        			aCols[i].addEventListener('click', function(e){
                        // alert(e.target.seatinfo.ticket_id);
        				if(e.target.sel) {	//为1   已锁
                            unlock(e.target.seatinfo.ticket_id);
        					count --;
        					e.target.sel = 0;
        					e.target.className = e.target.origin;
        					sCols = oDetail.getElementsByClassName("s-one");
        					for(var j = 0; j < sCols.length; j ++) {
        						if(sCols[j].seat_id == e.target.seatinfo.seat_id) {
        							oDetail.removeChild(sCols[j]);
        						}
        					}
        				}else {     //锁定
        					if(count < 6) {
                                lock(e.target.seatinfo.ticket_id);
	        					count ++;
	        					e.target.className = 's-locked';
	        					e.target.sel = 1;
	        					var oOne = document.createElement("div");
	        					oOne.className = 's-one';
	        					oOne.seat_id = e.target.seatinfo.seat_id;
	        					oOne.ticket_id = e.target.seatinfo.ticket_id;
	        					oOne.innerHTML = e.target.seatinfo.seat_row + '排'+ e.target.seatinfo.seat_column +'座';
	        					oDetail.appendChild(oOne);
        					}else{
        						alert("最多允许选6张票哦");
        					}
        				}
        				oCount.innerHTML = count;
        				oPay.innerHTML = count * price;
        			},false);
        		}

        		//给坏座位添加事件
        		var aBad = document.getElementsByClassName('s-bad');
        		var blen = aBad.length;
        		for(i = 0 ; i < blen; i ++) {
        			aBad[i].addEventListener('click',function(e){
        				alert("座位已坏！");
        			},false)
        		}

        		//给已出售座位添加事件
        		var aSel = document.getElementsByClassName("s-saled");
        		var slen = aSel.length;
        		for(i = 0; i < slen; i ++) {
        			aSel[i].addEventListener('click', function(e) {
        				alert("该座位已出售！")
        			},false);
        		}

                var aLoc = document.getElementsByClassName("s-locked");
                var clen = aLoc.length;
                for(i = 0; i < clen; i ++) {
                    aLoc[i].addEventListener('click', function(e) {
                        $.ajax({
                            type : 'get',
                            url : 'http://localhost:8080/tickets/checklock',
                            data : {
                                'ticket_id' : e.target.seatinfo.ticket_id
                            },
                            success : function(res) {
                                if(res.error){
                                    alert(res.result);
                                }else {
                                    lock(e.target.seatinfo.ticket_id)
                                }
                            },
                            error : function(res) {
                                alert('error:' + JSON.stringify(res));
                            }
                        })
                    }, false);
                }
        	}
        },
        error : function(res) {
        	alert('出错：'+JSON.stringify(res));
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

function hhh(date){
        var dates = new Date(date);
        var years = dates.getFullYear();
        var months = dates.getMonth()+1;
        var days = dates.getDate();
        var hours = dates.getHours();
        var mins =dates.getMinutes(); 
        var secs = dates.getSeconds();
        var ss = years+"-"+months+"-"+days+" "+hours+":"+mins+":"+secs;
        return ss;
         
}

function lock(ticket_id) {
    if(sessionStorage.getItem('indenty')) {
        $.ajax({
            type : 'get',
            url : 'http://localhost:8080/tickets/lock',
            data : {
                'ticket_id' : ticket_id
            },
            success : function(res) {
                if(res.error){
                    alert(res.result);
                }else {
                    //
                }
            },
            error : function(res) {
                alert('error:' + JSON.stringify(res));
            }
        })
    }else {
        alert('用户未登录！');
    }
}

function unlock(ticket_id) {
    if(sessionStorage.getItem('indenty')) {
        $.ajax({
            type : 'get',
            url : 'http://localhost:8080/tickets/unlock',
            data : {
                'ticket_id' : ticket_id
            },
            success : function(res) {
                if(res.error){
                    alert(res.result);
                }else {
                    //
                }
            },
            error : function(res) {
                alert('error:' + JSON.stringify(res));
            }
        })
    }else {
        alert('用户未登录！');
    }
}

function checkLock(ticket_id) {
    $.ajax({
        type : 'get',
        url : 'http://localhost:8080/tickets/checklock',
        data : {
            'ticket_id' : ticket_id
        },
        success : function(res) {
            if(res.error){
                alert(res.result);
            }else {
                
            }
        },
        error : function(res) {
            alert('error:' + JSON.stringify(res));
        }
    })
}