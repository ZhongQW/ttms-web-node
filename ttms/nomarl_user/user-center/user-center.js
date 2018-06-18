function run(){
    document.getElementById('complete').click();
}
window.onload = function(){
    var table = document.getElementById('table');
    var btn1 = document.getElementById('complete');
    var btn2 = document.getElementById('Unpaid');

    //订单信息
    btn1.onclick = function() {
        if(btn2.className === 'btn2') {
            btn2.removeClass('btn2');
        }
        btn1.className = 'btn1';
        $.ajax({
            type: "get",
            url: "http://localhost:8080/user/",
            data: {
                'user_id': id
            },
            success: function (res) {
                if (!res.error) {
                    for (var i = 0; i < res.result.length; i++) {
                        var tr = document.createElement('tr');
                        var tdName = document.createElement('td');
                        tdName.innerHTML = res.result[i].userName;
                        var tdcount = document.createElement('td');
                        tdcount.innerHTML = res.result[i].count;
                        var tdmoney = document.createElement('td');
                        tdmoney.innerHTML = res.result[i].money;
                        var tdstatus = document.createElement('td');
                        tdstatus.innerHTML = res.result[i].time;
                        tr.appendChild(tdName);
                        tr.appendChild(tdcount);
                        tr.appendChild(tdmoney);
                        tr.appendChild(tdstatus);
                        table.appendChild(tr);
                    }
                } else {
                    alert(res.result);
                }
            },
            error: function (res) {
                alert("加载失败！" + JSON.stringify(res));
            }
        });
    };

    //待支付订单
    btn2.onclick = function(){
        if(btn1.className === 'btn1') {
            btn1.removeClass('btn1');
        }
        btn1.className = 'btn1';
        $.ajax({
            type : "get",
            url : "http://localhost:8080/user/",
            data : {
                'user_id' : id
            },
            success : function(res){
                if(!res.error){
                    for(var i=0;i<res.result.length;i++) {
                        var tr = document.createElement('tr');
                        var tdName = document.createElement('td');
                        tdName.innerHTML = res.result[i].userName;
                        var tdcount = document.createElement('td');
                        tdcount.innerHTML = res.result[i].count;
                        var tdmoney = document.createElement('td');
                        tdmoney.innerHTML = res.result[i].money;
                        var tdstatus = document.createElement('td');
                        var aT = document.createElement('a');
                        tdstatus.innerHTML = '去支付';
                        a.href = '../pay/pay.html';//支付界面
                        tdstatus.appendChild(aT);
                        tr.appendChild(tdName);
                        tr.appendChild(tdcount);
                        tr.appendChild(tdmoney);
                        tr.appendChild(tdstatus);
                        table.appendChild(tr);
                    }
                }else{
                    alert(res.result);
                }
            },
            error : function(res){
                alert("加载失败！" + JSON.stringify(res));
            }
        });
    }
}
;