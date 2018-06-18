window.onload = function() {
    //动态加载所有上线剧目
    var oWhole = document.getElementById("whole");
    var oPlaywei = document.getElementById("play_wei");
    var oSelstudio = document.getElementById('studio_selected_name');
    var aDiv = document.getElementsByClassName("div1");
    var price;
    // var Storage = window.localStorage;
    $.ajax({
        type: "get",
        url: "http://localhost:8080/schedule/all",
        data: {
            'type': 1
        },
        success: function (res) {
            console.log(res);
            if (!res.error) {
                for (var i = 0; i < res.count; i++) {
                   //将演出厅的id与name保存在localStorage里面
                    preservation(res.studios[i].studio_id,res.studios[i].studio_name);
                    //加载演出厅的名字、增加按钮
                    var div_studio = document.createElement("div");
                    div_studio.className = 'div1';
                    div_studio.index = res.studios[i].studio_id;
                    div_studio.setAttribute("name",res.studios[i].studio_name);
                    var div_cover = document.createElement("div");
                    div_cover.className = 'cover';
                    var s_cover = document.createElement("div");
                    s_cover.className = 's-cover';
                    var div_studio_name = document.createElement("p");
                    div_studio_name.className = 'studio_name';
                    div_studio_name.innerHTML = res.studios[i].studio_name;
                    var div_add_play = document.createElement("div");
                    div_add_play.className = 'toadd';
                    //将演出厅的id传给btnP的监听事件
                    // console.log(res.studios[i].studio_id);
                    div_add_play.addEventListener('click', click_studio, false);
                    // //button绑定的模态框动态加载
                    div_add_play.setAttribute("data-toggle","modal");
                    div_add_play.setAttribute("data-target","#myModal");
                    div_cover.appendChild(div_studio_name);
                    div_studio.appendChild(div_cover);

                    for (var j = 0; j < res.result.length; j++) {
                        if (res.result[j].studio_id === res.studios[i].studio_id) {
                            var div_schedule = document.createElement('div');
                            div_schedule.className = 'schedule';
                            div_schedule.sched_id = res.result[j].sched_id;
                            div_schedule.play_id = res.result[j].play_id;
                            var oimg = document.createElement('img');
                            oimg.src = '../img/' + res.result[j].play_image.split('\\')[2];
                            var div_play_name = document.createElement('div');
                            div_play_name.innerHTML = res.result[j].play_name;
                            div_play_name.className = 'name';
                            // var div_start = document.createElement('div');
                            // div_start = '开始时间：'+res.result[j].sched_time;
                            var div_time = document.createElement('div');
                            div_time.innerHTML = new Date(res.result[j].sched_time).Format("yyyy-MM-dd HH:mm:ss") + '<br/> 时长：' + res.result[j].play_length + '分钟';
                            div_time.className = "time";
                            div_schedule.appendChild(oimg);
                            div_schedule.appendChild(div_play_name);
                            div_schedule.appendChild(div_time);
                            // div_schedule.appendChild(div_start);
                            s_cover.appendChild(div_schedule);
                        }
                    }
                    div_studio.appendChild(s_cover)
                    s_cover.appendChild(div_add_play);
                    oWhole.appendChild(div_studio);
                }
                var aSched = document.getElementsByClassName('schedule');
                for(var i = 0; i < aSched.length; i ++) {
                    aSched[i].addEventListener('click',function(e) {
                       sessionStorage.setItem('sched_id',e.target.parentNode.sched_id);
                       sessionStorage.setItem('play_id',e.target.parentNode.play_id);
                       window.location.href='./sched_details.html';    //演出计划详情界面 详细、修改演出计划
                    },false)
                }
            } else {
                alert(res.result);
            }
        },
        error: function (res) {
            alert("加载失败！" + JSON.stringify(res));
        }
    })
    //根据演出厅id获取演出厅名字
    function find_studioName(id) {
        return window.localStorage.getItem(id);
    }
    //将演出厅id以及name存储到localStorage
    function preservation(id,name){
        console.log(id,name);
        if(!window.localStorage){
            alert("浏览器支持localstorage");
            return false;
        }else{
            // var storage=window.localStorage;
            window.localStorage.setItem(id,name);
        }
    }
    function removeAllChild()
    {
        var div = document.getElementById("play_wei");
        while(div.hasChildNodes()) //当div下还存在子节点时 循环继续
        {
            div.removeChild(div.firstChild);
        }
    }
    //显示未安排的剧目
    function click_studio(e) {
        // console.log(e.target.parentNode.parentNode.index);
        removeAllChild();
        $.ajax({
            type: "get",
            url: "http://localhost:8080/plays/type",
            data: {
                'type': 0
            },
            success: function (res) {
                // console.log(res);
                if (!res.error) {
                    for (var i = 0; i < res.result.length; i++) {
                        var play_name_add = document.createElement('button');
                        play_name_add.innerHTML = res.result[i].play_name;
                        play_name_add.index = res.result[i].play_id;
                        play_name_add.setAttribute("name",res.result[i].play_name);
                        play_name_add.addEventListener('click',changeP,false);
                        var play_time_add = document.createElement('span');
                        play_time_add.className = 'play_time';
                        play_time_add.innerHTML = '时长：'+res.result[i].play_length + '<br/>建议票价：'+res.result[i].play_ticket_price;
                        var div_play_add = document.createElement('div');
                        div_play_add.className = "add_play";
                        div_play_add.price = res.result[i].play_ticket_price;

                        div_play_add.appendChild(play_name_add);
                        div_play_add.appendChild(play_time_add);
                        oPlaywei.appendChild(div_play_add);
                    }
                    oSelstudio.innerHTML = find_studioName(e.target.parentNode.parentNode.index);
                    oSelstudio.studio_id = e.target.parentNode.parentNode.index;
                } else {
                    alert(res.result);
                }
            },
            error: function (res) {
                alert("加载失败!" + JSON.stringify(res));
            }
        })
    }

    //剧目选中变色
    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
    function changeP(e) {
        let div = document.getElementById("play_wei");
        let oli = div.getElementsByTagName("button");
        for (let i = 0; i < oli.length; i++) {
            if (hasClass(oli[i], 'play_select')) {
                oli[i].className = "";
            }
        }
        let target = e.currentTarget;
        price = target.parentNode.price;
        target.classList.add('play_select');
        document.getElementById('play_selected_name').innerHTML = target.name;
        $('#play_selected_name').data("add_schedule_play_id",target.index);
    }

    //安排剧目
    document.getElementById("btnAdd").onclick = function() {
        var time = new Date($('#start_time').val()).toLocaleString();
        var arr1 = time.split(" ");
        var arr2 = (new Date($('#start_time').val())+'').split(" ");
        var ss = arr1[0].replace(/\//g,"-") + " " + arr2[4];
        $.ajax({
            type: "get",
            url: "http://localhost:8080/schedule/add",
            data: {
                'studio_id':oSelstudio.studio_id,
                'play_id':$('#play_selected_name').data("add_schedule_play_id"),
                'sched_time':ss,
                'price' : document.getElementById('price').value || price
            },
            success: function (res) {
                if (!res.error) {
                    alert(res.result);
                    location.reload();
                } else {
                    alert(res.result);
                }
            },
            error: function (res) {
                alert("加载失败！" + JSON.stringify(res));
            }
        });
    }
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