window.onload = function() {
    var btnAdd = document.getElementById("btnAdd");
    var oFile = document.getElementById("xdaTanFileImg");
    //动态加载剧目信息
    //0 :动作片, 1 : 喜剧片 , 2 : 恐怖片, 3 : 家庭片
    //0 : 国语 , 1 : 粤语, 2 : 英语, 3 : 韩语, 4 : 日语}
    //0：待安排演出 , 1：已安排演出, -1：下线
    var table = document.getElementById("table");
    $.ajax({
        type: "get",
        url: "http://localhost:8080/plays/get",
        success: function (res) {
            if (!res.error) {
                for (var i = 0; i < res.result.length; i++) {
                    var tr = document.createElement("tr");
                    var tdname = document.createElement("td");
                    var tdtype = document.createElement("td");
                    var tdlang = document.createElement("td");
                    var tdtime = document.createElement("td");
                    var tdtickt = document.createElement("td");
                    var tdstatus = document.createElement("td");
                    tr.index = res.result[i].play_id;
                    var tdCao = document.createElement("td");
                    var tda2 = document.createElement("a");
                    tda2.innerHTML = "上线  ";
                    tda2.addEventListener("click", onlineP, false);
                    var tda3 = document.createElement("a");
                    tda3.innerHTML = "下线  ";
                    tda3.addEventListener("click", outlineP, false);
                    tdCao.appendChild(tda2);
                    tdCao.appendChild(tda3);

                    var lang = ntoLang(res.result[i].play_lang_id);
                    var status = ntoStatus(res.result[i].play_status);
                    var type = ntoType(res.result[i].play_type_id);

                    tdname.innerHTML = res.result[i].play_name;
                    tdtype.innerHTML = type;
                    tdlang.innerHTML = lang;
                    tdtime.innerHTML = res.result[i].play_length;
                    tdtickt.innerHTML = res.result[i].play_ticket_price;
                    tdstatus.innerHTML = status;

                    tr.appendChild(tdname);
                    tr.appendChild(tdtype);
                    tr.appendChild(tdlang);
                    tr.appendChild(tdtime);
                    tr.appendChild(tdtickt);
                    tr.appendChild(tdstatus);
                    tr.appendChild(tdCao);
                    table.appendChild(tr);
                }
                hover();
            }else{
                    alert(res.result);
                }
            },
            error: function (res) {
                alert("加载失败！" + JSON.stringify(res));
            }
    })
    
    var fileUrl;
    oFile.addEventListener("change",function(){
        fileUrl = oFile.value;
    },false);

    //添加剧目
    btnAdd.onclick = function () {
        var lang = $('#lang').val();
        var type = $('#select').val();
        var data = {
            'type': typetoNum(type),             //剧目类型
            'lang': langtoNum(lang),             //语言
            'name': $('#name').val(),          //剧目名称
            'introduction': $('#introduction').val(),   //介绍
            'image': fileUrl,          //图片
            'time': $('#length').val(),             //时间
            'price': $('#price').val(),        //价钱
        }
        console.log(data);

        $.ajax({
            type: "post",
            dataType: "json",
            url: "http://localhost:8080/plays/add",
            data: data,
            success: function (res) {
                if (!res.error) {
                  location.reload();
                } else {
                    alert(res.result);
                }
            },
            error: function () {
                alert("添加失败！");
            }
        });
    }


    //修改剧目状态

    //上线
    function onlineP(t) {
        var result = confirm("确认上线吗？");
        if(result){
            $.ajax({
                type: "get",
                url: "http://localhost:8080/plays/online",
                data: {
                    "play_id": t.target.parentNode.parentNode.index
                },
                success: function(res){//res里面包含了修改后的结果
                    if(!res.error){
                        alert('上线成功');
                        t.target.parentNode.parentNode.getElementsByTagName('td')[5].innerHTML = '上线';
                    }else{
                        alert(res.result);
                    }
                },
                error: function(res){
                    alert("修改失败"+JSON.stringify(res));
                }
            })
        }
    }

    //下线
    function outlineP(t) {
        var result = confirm("确认下线吗？");
        if(result){
            $.ajax({
                type: "get",
                url: "http://localhost:8080/plays/outline",
                data: {
                    "play_id": t.target.parentNode.parentNode.index
                },
                success: function(res){//res里面包含了修改后的结果
                    if(!res.error){
                        alert('下线成功');
                        t.target.parentNode.parentNode.getElementsByTagName('td')[5].innerHTML = '下线';
                    }else{
                        alert(res.result);
                    }
                },
                error: function(res){
                    alert("修改失败"+JSON.stringify(res));
                }
            })
        }
    }

function hover(){
    //滑动变色
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
        default:
            type = "动作片";
    }
    return type;
}

//语言转为数字
function langtoNum(val) {
    var lang;
    switch (val) {
        case '国语':
                lang = 0;
                break;
        case '粤语':
                lang = 1;
                break;
        case '英语':
                lang = 2;
                break;
        case '韩语':
                lang = 3;
                break;
        case '日语':
                lang = 4;
                break;
        default:
                lang = 0;
    }
    return lang;
}

//status转为数字
function statustoNum(val) {
    var status;
    switch (val) {
        case '待安排演出':
            status = 0;
            break;
        case '已安排演出':
            status = 1;
            break;
        case '下线':
            status = 2;
            break;
        default:
            status = 0;
    }
    return status;
}

//type转为数字
function typetoNum(val) {
    var type ;
    switch (val) {
        case '动作片':
            type = 0;
            break;
        case '动作片':
            type = 1;
            break;
        case '恐怖片':
            type = 2;
            break;
        case '家庭片':
            type = 3;
            break;
        case '科技片':
            type = 4;
            break;
        case '动画片':
            type = 5;
            break;
        default:
            type = 0;
    }
    return type;
}