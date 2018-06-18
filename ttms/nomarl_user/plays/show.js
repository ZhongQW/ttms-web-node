window.onload = function () {
	var oShow = document.getElementsByClassName("p-show")[0];
	$.ajax({
        type: "get",
        url: "http://localhost:8080/plays/type",
        data: {
            'type': 1
        },
        success: function (res) {
            console.log(res);
            if (!res.error) {
            	var i,len = res.result.length;
                var otitle = document.createElement('div');
                otitle.innerHTML = '正在热映 >';
                otitle.className = 'tclass';
                oShow.appendChild(otitle);
            	for(i = 0; i < len; i ++) {	
            		var col = document.createElement('div');
            		col.className = 'p-col';
            		col.play_id = res.result[i].play_id;
            		var img = document.createElement('div');
            		img.className = 'p-img';
            		img.style.background = 'url(\'../../img/' + res.result[i].play_image.split('\\')[2] + '\') no-repeat';
            		img.style.backgroundPosition = 'center';
            		img.style.backgroundSize = 'auto 100%';

            		var info = document.createElement('div');
            		info.className = 'p-info';
            		var name = document.createElement('div');
            		name.className = 'p-name';
            		name.innerHTML = res.result[i].play_name;
            		var time = document.createElement('div');
            		time.className = 'time';
            		time.innerHTML = res.result[i].play_length + '分钟-' + ntoType(res.result[i].play_type_id) +'-'+ ntoLang(res.result[i].play_lang_id);
            		var into = document.createElement('div');
            		into.className = 'p-into';
            		into.innerHTML = res.result[i].play_introduction
            		var btn = document.createElement('div');
            		btn.className = 'p-btn';
            		btn.innerHTML = '选座购票'

                    btn.addEventListener('click',tobuy, false);
            		info.appendChild(name);
            		info.appendChild(time);
            		info.appendChild(into);
            		info.appendChild(btn);

            		col.appendChild(img);
            		col.appendChild(info);
            		oShow.appendChild(col);
            	}
            } else {
                alert(res.result);
            }
        },
        error: function (res) {
            alert("加载失败！" + JSON.stringify(res));
        }
    })

    $.ajax({
        type: "get",
        url: "http://localhost:8080/plays/type",
        data: {
            'type': 0
        },
        success: function (res) {
            console.log(res);
            var otitle = document.createElement('div');
            otitle.className = 'hclass';
            otitle.innerHTML = '即将上映 >';
            oShow.appendChild(otitle);
            if (!res.error) {
                var i,len = res.result.length;
                for(i = 0; i < len; i ++) { 
                    var col = document.createElement('div');
                    col.className = 'p-col';
                    col.play_id = res.result[i].play_id;
                    var img = document.createElement('div');
                    img.className = 'p-img';
                    img.style.background = 'url(\'../../img/' + res.result[i].play_image.split('\\')[2] + '\') no-repeat';
                    img.style.backgroundPosition = 'center';
                    img.style.backgroundSize = 'auto 100%';

                    var pre = document.createElement('div');
                    pre.className = 'p-pre';
                    pre.innerHTML = '预售';
                    img.appendChild(pre);

                    var info = document.createElement('div');
                    info.className = 'p-info';
                    var name = document.createElement('div');
                    name.className = 'p-name';
                    name.innerHTML = res.result[i].play_name;
                    var time = document.createElement('div');
                    time.className = 'time';
                    time.innerHTML = res.result[i].play_length + '分钟-' + ntoType(res.result[i].play_type_id) +'-'+ ntoLang(res.result[i].play_lang_id);
                    var into = document.createElement('div');
                    into.className = 'p-into';
                    into.innerHTML = res.result[i].play_introduction
                    var btn = document.createElement('div');
                    btn.className = 'p-btn';
                    btn.innerHTML = '选座购票'

                    btn.addEventListener('click',tobuy, false);
                    info.appendChild(name);
                    info.appendChild(time);
                    info.appendChild(into);
                    info.appendChild(btn);

                    col.appendChild(img);
                    col.appendChild(info);
                    oShow.appendChild(col);
                }
            } else {
                alert(res.result);
            }
        },
        error: function (res) {
            alert("加载失败！" + JSON.stringify(res));
        }
    })
}

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
        default:
            type = "动作片";
    }
    return type;
}

function tobuy(e) {
    var play_id = e.target.parentNode.parentNode.play_id;
    sessionStorage.setItem('play_id',play_id);
    window.location = '../../palys/play_sched/play_sched.html';      //play_id 的有关计划显示
}