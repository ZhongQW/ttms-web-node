window.onload = function(){
    var table_user = document.getElementById("user_modify");


    //动态加载数据
    $.ajax({
        type: "get",
        url: "http://localhost:8080/users/all",
        success: function (res) {
            console.log(res);
            if (!res.error) {
                for (var i = 0; i < res.result.length; i++) {
                    var tr_user = document.createElement("tr");
                    tr_user.index = res.result[i].userID;

                    var td_name = document.createElement("td");
                    td_name.innerHTML = res.result[i].username;

                    var td_identity = document.createElement("td");
                    td_identity.innerHTML = idenType(res.result[i].type);
                   
                    // var td_operation = document.createElement("td");
                    
                    var reset_user = document.createElement("td");
                    reset_user.innerHTML = "重置";
                    reset_user.addEventListener("click", resetUser, false);

                    var delete_user = document.createElement("td");
                    delete_user.innerHTML = "删除";
                    delete_user.addEventListener("click", deleteUser, false);
                    
                    // td_operation.appendChild(delete_user);
                    // td_operation.appendChild(reset_user);
                    tr_user.appendChild(td_name);
                    tr_user.appendChild(td_identity);
                    // tr_user.appendChild(td_operation);
                    tr_user.appendChild(delete_user);
                    tr_user.appendChild(reset_user);

                    table_user.appendChild(tr_user);
                }
                hover();
            } else {
                alert(res.result);
            }
        },
        error: function (res) {
            alert("加载失败！" + JSON.stringify(res));
        }
    });

    //重置用户
    function resetUser(e) {
        // alert(e.target.parentNode.index);
        $.ajax({
            type: "get",
            url: "http://localhost:8080/users/res",
            data: {
                "user_id": e.target.parentNode.index
            },
            success: function (res) {//res里面包含了修改后的结果
                if(!res.error) {
                    alert("重置密码成功。初始密码为123456");
                }else{
                    alert(res.result);
                }
            },
            error: function (res) {
                alert("修改失败"+JSON.stringify(res));
            }
        });
    }

    //删除用户
    function deleteUser(e) {
        if(confirm("确认删除吗？")){
            $.ajax({
                type: "get",
                url: "http://localhost:8080/users/del",
                data: {
                    "user_id": e.target.parentNode.index
                },
                success: function (res) {//res里面包含了修改后的结果
                    if(!res.error) {
                        alert(res.result);
                        location.reload();
                        //table_user.deleteRow(e.target.parentNode.parentNode.index);
                    }else{
                        alert(res.result);
                    }
                },
                error: function (res) {
                    alert("修改失败"+JSON.stringify(res));
                }
            });
        }
    }

    //滑动变色
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

    //判断用户身份
    function idenType(iden) {
        if(iden == 0){
            return "售票员";
        }else{
            return "普通用户";
        }
    }
}