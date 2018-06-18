window.onload = function(id) {
    var backImg = document.getElementById("back").firstElementChild;
    var nameP = document.getElementById("playName");
    var typeP = document.getElementById("type");
    var lang = document.getElementById("lang");
    var lengthP = document.getElementById("length");
    var money = document.getElementById("money");
    var intro = document.getElementById("intro");
    var timeP = document.getElementById("timeP");
    var status = document.getElementById("status");
    var studio = document.getElementById("studio");
    var btn = document.getElementById("update_schedul");
    var card = document.getElementById("imgP");
    var dateup = document.getElementById("dateup");
    var statusup = document.getElementById("statusup");
    var studioup = document.getElementById("studioup");
    var ticketp = document.getElementById('ticket-p');
    var afterp = document.getElementById('after-p');

    var play_id = sessionStorage.getItem("play_id");
    var sched_id = sessionStorage.getItem("sched_id");

    // alert(play_id,sched_id);
    var p_id,s_id;
    //动态加载
    $.ajax({
        type: "get",
        url: "http://localhost:8080/schedule/gpas",
        data: {
            'sched_id' : sched_id
        },
        success: function (res) {
            console.log(res);
            if (!res.error) {
                backImg.src = '../../img/' + res.result[0].play_image.split('\\')[2];
                card.src = '../../img/' + res.result[0].play_image.split('\\')[2]
                nameP.innerHTML =  res.result[0].play_name;
                timeP.innerHTML = new Date(res.result[0].sched_time).Format("yyyy-MM-dd HH:mm:ss");
                dateup.value = getFormat(res.result[0].sched_time);
                typeP.innerHTML = ntoType(res.result[0].play_type_id);
                lang.innerHTML = ntoLang(res.result[0].play_lang_id);
                lengthP.innerHTML = res.result[0].play_length;
                money.innerHTML = res.result[0].sched_ticket_price;
                intro.innerHTML = res.result[0].play_introduction;
                status.innerHTML = res.result[0].play_name;
                studio.innerHTML = res.result[0].studio_name;
                ticketp.innerHTML = res.result[0].sched_ticket_price;
                afterp.value = res.result[0].sched_ticket_price;
                for(var i = 0; i < res.studios.length; i ++) {
                    var option = document.createElement('option');
                    option.innerHTML = res.studios[i].studio_name;
                    option.studio_id = res.studios[i].studio_id;
                    studioup.appendChild(option);
                }
                for(var i = 0; i < res.plays.length; i ++) {
                    var option = document.createElement('option');
                    option.innerHTML = res.plays[i].play_name;
                    option.play_id = res.plays[i].play_id;
                    statusup.appendChild(option);
                }
                var apts = statusup.getElementsByTagName("option");
                for(var i = 0; i < apts.length; i ++) {

                    if(apts[i].play_id == play_id) {
                        apts[i].selected = true;
                    }
                }
                var opts = studioup.getElementsByTagName("option");
                for(var i = 0; i < opts.length; i ++) {
                    if(opts[i].studio_id == res.result[0].studio_id) {
                        opts[i].selected = true;
                    }
                }
            } else {
                alert(res.result);
            }
        },
        error: function (res) {
            alert("加载失败" + JSON.stringify(res));
        }
    });

    //修改演出计划
    btn.onclick = function () {
        // alert(statusup.options[statusup.selectedIndex].play_id);
        var time = new Date(dateup.value).Format("yyyy-MM-dd HH:mm:ss");
        $.ajax({
            type: "get",
            url: "http://localhost:8080/schedule/upd",
            data: {
                'sched_id' :sched_id,
                'info' : {
                    'play_id': statusup.options[statusup.selectedIndex].play_id,
                    'sched_time': time,
                    'studio_id': studioup.options[studioup.selectedIndex].studio_id,
                    'sched_ticket_price' :afterp.value
                }
            },
            success: function (res) {
                console.log(res);
                if (!res.error) {
                    window.location = "../schedule/schedule.html";
                } else {
                    alert(res.result);
                }
            },
            error: function (res) {
                alert("加载失败！" + JSON.stringify(res));
            }
        })
    };

};

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

function getFormat(ns){
    var nTime = new Date(ns);
    var format = "";
    format += nTime.getFullYear()+"-";
    format += (nTime.getMonth()+1)<10?"0"+(nTime.getMonth()+1):(nTime.getMonth()+1);
    format += "-";
    format += nTime.getDate()<10?"0"+(nTime.getDate()):(nTime.getDate());
    format += "T";
    format += nTime.getHours()<10?"0"+(nTime.getHours()):(nTime.getHours());
    format += ":";
    format += nTime.getMinutes()<10?"0"+(nTime.getMinutes()):(nTime.getMinutes());
    format += ":00";
    return format;
}