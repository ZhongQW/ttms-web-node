window.onload = function(){
    //动态加载演出厅信息
    var table = document.getElementById("customers");
    $.ajax({
        type:"get",
        url:"http://localhost:8080/studio/all",
        success:function(res){
            if(!res.error) {
                for (var i = 0; i < res.result.length; i++) {
                    var tr = document.createElement("tr");
                    var tdid = document.createElement("td");
                    var tdname = document.createElement("td");
                    var tdseat = document.createElement("td");
                    var tdcao = document.createElement("td");
                    var tdetail = document.createElement('td');
                    tdetail.addEventListener('click',seatControl,false);
                    tr.index = res.result[i].studio_id;
                    tdcao.addEventListener("click",deleteRow,false);
                    tdcao.innerHTML = '删除';
                    tdid.innerHTML = res.result[i].studio_id;
                    tdname.innerHTML = res.result[i].studio_name;
                    tdetail.innerHTML = '座位管理';
                    tdseat.innerHTML = res.result[i].studio_col_count*res.result[i].studio_row_count;
                    tr.appendChild(tdid);
                    tr.appendChild(tdname);
                    tr.appendChild(tdseat);
                    tr.appendChild(tdcao);
                    tr.appendChild(tdetail);
                    table.appendChild(tr);
                }
                hover();
            }else{
                alert(res.result);
            }
        },
        error:function(res){
            alert("加载失败！"+JSON.stringify(res));
        }
    })

    //删除演出厅
    function deleteRow(e) {
        var result = confirm("确定删除？");
        // console.log(e.target.parentNode.index);
        if (result) {
            $.ajax({
                type: "get",
                // dataType: "json",
                url: "http://localhost:8080/studio/del",
                data: {
                    "studio_id": e.target.parentNode.index
                },
                success: function (res) {
                    console.log(res);
                    if (!res.error) {
                        var index = e.target.parentNode.rowIndex;
                        table.deleteRow(index);
                    } else {
                        alert(res.result);
                    }
                },
                error: function (res) {
                    alert("删除失败：" + JSON.stringify(res));
                }
            });
        }
    }

    function seatControl(e) {
        sessionStorage.setItem('stu_id',e.target.parentNode.childNodes[0].innerHTML);
        window.location.href='../seat/seat.html';
    }

    //增加演出厅
    var btnS = document.getElementById("btn");
    var studio_name = document.getElementById("name");
    var studio_row = document.getElementById("row");
    var studio_col = document.getElementById("col");
    var studio_intro = document.getElementById("intro");
    btnS.onclick = function(){
        $.ajax({
            type: "get",
            // dataType: "json",
            url: "http://localhost:8080/studio/add",
            data: {
                "studio_name":studio_name.value,
                "studio_row_count":studio_row.value,
                "studio_col_count":studio_col.value,
                "studio_introduction":studio_intro.value
            },
            success: function (res) {
                console.log(res);
                if (!res.error) {
                    location.reload();
                }else{
                    alert(res.result);
                }
            },
            error: function (res) {
                // alert(JSON.stringify(res));
                alert("添加失败："+ JSON.stringify(res));
            }
        });
    }

    //滑过变色
    function hover(){
        var rows = document.getElementsByTagName("tr");
        for(var i=0 ;i<rows.length; i++)
        {
            rows[i].onmouseover = function(){//鼠标移上去,添加一个类'hou'
                this.className += 'hou';
            }
            rows[i].onmouseout = function(){//鼠标移开,改变该类的名称
                this.className = this.className.replace('hou','');
            }
        }
    }

}