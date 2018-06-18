window.onload = function(){
    var table = document.getElementById('play_table');
    var logo = 0;
    $.ajax({
        type: "get",
        url:"http://localhost:8080/sale/alsler",
        success: function(res){
            if(!res.error){
                for(let i=0;i<res.result.length;i++){
                    var tr = document.createElement('tr');
                    var tdName = document.createElement('td');
                    var tdCount = document.createElement('td');
                    var tdMoney = document.createElement('td');
                    tdName.innerHTML = res.result[i].username;
                    tdCount.innerHTML = res.result[i].count;
                    tdMoney.innerHTML = res.result[i].saleMoney;
                    tr.appendChild(tdName);
                    tr.appendChild(tdCount);
                    tr.appendChild(tdMoney);
                    table.appendChild(tr);
                    if(logo === 1){
                        tr.className = ge;
                        logo = 0;
                    }
                }
            }else{
                alert(res.result)
            }
        },
        error: function(res){
            alert("加载失败！"+JSON.stringify(res));
        }
    });
};