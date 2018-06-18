window.onload = function() {
	//确定演出计划选择座位  获取票(～o￣3￣)～
	//var studio = sessionStorage.getItem('now');
    var stu_id = sessionStorage.getItem('stu_id');
	var len, aCols = [], sCols =[], price;
	// var s = 15;
	var oTime = document.getElementById('time');
	var oStudio = document.getElementsByClassName('s-studio')[0];
	var oDetail = document.getElementsByClassName('s-detail')[0];

	var pName , pLength, sName, count = 0;

	var osName = document.getElementById('studio');
	var osTime = document.getElementById('time');
	var oSel = document.getElementsByClassName('e-seled')[0];
	var oCount = document.getElementById('num');

	function animate() {
		oTime.innerHTML = (new Date()).toLocaleString();;
		window.requestAnimationFrame(animate);
	}
	window.requestAnimationFrame(animate);
	get(count,stu_id,osName,oCount,oStudio,oDetail,oTime,sCols);

        var toEmp = document.getElementById("toemp");
        var toBad = document.getElementById("tobad");
        var toGood = document.getElementById("togood");

        toBad.addEventListener('click',function(){
                var sCols = document.getElementsByClassName("s-one");
                var len = sCols.length, i, seats =[];
                for(i = 0; i < len; i ++) {
                        seats.push(sCols[i].seat_id);
                }
                if(seats.length === 0){
                        alert("没有选中任何位置！");
                }else {
                      $.ajax({
                                type : 'get',
                                url : 'http://localhost:8080/seat/change',
                                data : {
                                        seats : seats,
                                        seat_status : 0
                                },
                                success : function(res) {
                                        if(res.error) {
                                                alert('出错：'+JSON.stringify(res));
                                        }else {
                                                location.reload();
                                        }
                                },
                                error : function(res) {
                                        alert('出错：'+JSON.stringify(res));
                                }
                        })  
                }
                
        },false)

        toEmp.addEventListener('click',function(){
                var sCols = document.getElementsByClassName("s-one");
                var len = sCols.length, i, seats =[];
                for(i = 0; i < len; i ++) {
                        seats.push(sCols[i].seat_id);
                }
                if(seats.length === 0){
                        alert("没有选中任何位置！");
                }else{
                        $.ajax({
                                type : 'get',
                                url : 'http://localhost:8080/seat/change',
                                data : {
                                        seats : seats,
                                        seat_status : 2
                                },
                                success : function(res) {
                                        console.log(res);
                                        if(res.error) {
                                                alert('出错：'+JSON.stringify(res));
                                        }else {
                                                location.reload();
                                        }
                                },
                                error : function(res) {
                                        alert('出错：'+JSON.stringify(res));
                                }
                        }) 
                }
              
        },false)

        toGood.addEventListener('click',function(){
                var sCols = document.getElementsByClassName("s-one");
                var len = sCols.length, i, seats =[];
                for(i = 0; i < len; i ++) {
                        seats.push(sCols[i].seat_id);
                }
                if(seats.length === 0){
                        alert("没有选中任何位置！");
                }else {
                    $.ajax({
                        type : 'get',
                        url : 'http://localhost:8080/seat/change',
                        data : {
                                seats : seats,
                                seat_status : 1
                        },
                        success : function(res) {
                                if(res.error) {
                                        alert('出错：'+JSON.stringify(res));
                                }else {
                                        location.reload();
                                }
                        },
                        error : function(res) {
                                alert('出错：'+JSON.stringify(res));
                        }
                     })    
                }
                
        },false)
}

function get(count,stu_id,osName,oCount,oStudio,oDetail,oTime,sCols){
	$.ajax({
		type: "get",
                url: "http://localhost:8080/seat/get",
                data : {
                	stu_id : stu_id
                },
                success: function(res) {
                	console.log(res);
                	if(res.error) {	
                		alert('出错：'+res.result);
                	}else {
                		var col = res.result[0].studio_col_count;
                		var row = res.result[0].studio_row_count;
                		// oPlay.innerHTML = res.result[0].play_name;
                		osName.innerHTML = res.result[0].studio_name + '演出厅';
                		oCount.innerHTML = count;
                		// oCost.innerHTML = new Date(res.result[0].sched_time).toLocaleString();
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
                				oCol.innerHTML = j;
                				oCol.seatinfo = res.result[j+10*(i-1)-1];
                				oCol.sel = 0;
                				if(res.result[j+10*(i-1)-1].seat_status === 0) {
                					oCol.orgin = oCol.className = 's-bad';
                				}else if(res.result[j+10*(i-1)-1].seat_status === 2) {
                					oCol.orgin = oCol.className = "s-emp";
                				}else {
                                    oCol.orgin = oCol.className = "s-col";
                                }
                                    oCol.bgc = oCol.style.backgroundColor;
                                    oCol.addEventListener('click', function(e){
                                        if(e.target.sel) {      //为1
                                            count --;
                                            e.target.sel = 0;
                                            e.target.className = e.target.orgin;
                                            sCols = oDetail.getElementsByClassName("s-one");
                                            for(var j = 0; j < sCols.length; j ++) {
                                                 if(sCols[j].seat_id == e.target.seatinfo.seat_id) {
                                                    oDetail.removeChild(sCols[j]);
                                                }
                                            }
                                        }else {
                                            count ++;
                                            e.target.className = 's-sel';
                                            e.target.sel = 1;
                                            var oOne = document.createElement("div");
                                            oOne.className = 's-one';
                                            oOne.seat_id = e.target.seatinfo.seat_id;
                                                                // oOne.ticket_id = e.target.seatinfo.ticket_id;
                                            oOne.innerHTML = e.target.seatinfo.seat_row + '排'+ e.target.seatinfo.seat_column +'座';
                                            oDetail.appendChild(oOne);
                                        }
                                            oCount.innerHTML = count;
                                   },false)
                				oMain.appendChild(oCol);
                			}
                			oRow.appendChild(oIndex);
                			oRow.appendChild(oMain);
                			oStudio.appendChild(oRow);
                		}
                		aCols = document.getElementsByClassName('s-col');

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