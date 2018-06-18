window.onload = function() {
	var oHot = document.getElementsByClassName("hotFilm")[0];
    var aLink = document.getElementsByClassName("allLink")[0];
    aLink.onclick = function() {
        sessionStorage.setItem("p_type",1);
        window.location = '../../palys/play_show/showplay.html';
    }

    var wLink = document.getElementsByClassName('willReceiveAllLink')[0];
    wLink.onclick = function() {
        sessionStorage.setItem("p_type",0);
        window.location = '../../palys/play_show/showplay.html';
    }
	$.ajax({
        type: "get",
        url: "http://localhost:8080/plays/type",
        data: {
            'type': 0
        },
        success: function (res) {
            console.log(res);
            if (!res.error) {
            	var i,len = res.result.length;
                if(len >= 7) len = 7;
                for(i = 0; i < len; i ++) {
                    var ofilm = document.createElement("div");
                    ofilm.className = 'film';
                    ofilm.play_id = res.result[i].play_id;

                    var img = document.createElement('img');
                    img.src = '../../img/' + res.result[i].play_image.split('\\')[2];
                    img.className = 'filmImage';

                    var obtn = document.createElement('button');
                    obtn.innerHTML = '购票';
                    obtn.className = 'buyBtn';
                    obtn.addEventListener('click',function(e) {
                    sessionStorage.setItem('play_id',e.target.parentNode.play_id);
                       window.location = '../../palys/play_sched/play_sched.html';
                    },false);

                    ofilm.appendChild(img);
                    ofilm.appendChild(obtn);
                    oHot.appendChild(ofilm);
                }
            } else {
                alert(res.result);
            }
        },
        error: function (res) {
            alert("加载失败！" + JSON.stringify(res));
        }
    })

    var oWill = document.getElementsByClassName("willReceivedFilm")[0];
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
                if(len >= 7) len = 7;
                for(i = 0; i < len; i ++) {
                    var ofilm = document.createElement("div");
                    ofilm.className = 'film';
                    ofilm.play_id = res.result[i].play_id;
                    
                    var img = document.createElement('img');
                    img.src = '../../img/' + res.result[i].play_image.split('\\')[2];
                    img.className = 'filmImage';

                    var obtn = document.createElement('button');
                    obtn.innerHTML = '预购';
                    obtn.className = 'willBuyBtn';
                    obtn.addEventListener('click',function(e) {
                        sessionStorage.setItem('play_id',e.target.parentNode.play_id);
                        window.location = '../../palys/play_sched/play_sched.html';
                    },false);

                    ofilm.appendChild(img);
                    ofilm.appendChild(obtn);
                    oWill.appendChild(ofilm);
                }
            } else {
                alert(res.result);
            }
        },
        error: function (res) {
            alert("加载失败！" + JSON.stringify(res));
        }
    })

    var tFilm  = document.getElementsByClassName('todayFilm')[0];
    var aFilm  = document.getElementsByClassName('allTodayFilm')[0];
    $.ajax({
        type:'get',
        url:'http://localhost:8080/plays/count',
        success : function(res) {
            console.log(res);
            var i, plen = res.result.length;
            if(!res.error) {
                var ofdiv = document.createElement('div');
                ofdiv.className = 'firstFilm';
                var oimg = document.createElement('img');
                oimg.className = 'firstFilmImage';
                oimg.src = '../../img/' + res.result[0].play_image.split('\\')[2];
                var op1 = document.createElement('p');
                op1.className = 'firstFilmName';
                op1.innerHTML = res.result[0].play_name;
                var op2 = document.createElement('p');
                op2.className = 'firstFilmNumber';
                op2.innerHTML = res.result[0].count;
                ofdiv.appendChild(oimg);
                ofdiv.appendChild(op1);
                ofdiv.appendChild(op2);
                ofdiv.play_id = res.result[0].play_id;
                ofdiv.addEventListener('click',function(e){
                    sessionStorage.setItem('play_id',e.target.play_id);
                    window.location = '../../palys/play_sched/play_sched.html';
                },false)
                tFilm.appendChild(ofdiv);

                var aFilm = document.createElement('div');
                aFilm.className = 'allTodayFilmDiv';
                tFilm.appendChild(aFilm);

                for( i = 1; i < plen; i ++) {
                    var odiv = document.createElement('div');
                    odiv.className = 'filmMessage';
                    var p1 = document.createElement('p');
                    p1.className = 'filmName';
                    p1.innerHTML = res.result[i].play_name;
                    var p2 = document.createElement('p');
                    p2.className = 'filmNumber';
                    p2.innerHTML = res.result[i].count;
                    odiv.appendChild(p1);
                    odiv.appendChild(p2);
                    odiv.play_id = res.result[i].play_id;
                    odiv.addEventListener('click',function(e){
                        console.log(e.target);
                        sessionStorage.setItem('play_id',e.target.parentNode.play_id);
                        window.location = '../../palys/play_sched/play_sched.html';
                    },false)
                    aFilm.appendChild(odiv);
                }
            }else {
                alert(res.result);
            }
        },
        error : function(res) {
            alert(res.result);
        }
    })
}
