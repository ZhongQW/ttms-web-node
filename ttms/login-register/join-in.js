
window.onload = function() {
    var selectD =  document.getElementById("selectD");
    var passD = document.getElementById("passwordD");
    var nameD = document.getElementById("nameD");
    var btnD = document.getElementById("buttonD");
    var passZ = document.getElementById("passwordZ");
    var nameZ = document.getElementById("nameZ");
    var btnZ = document.getElementById("buttonZ");
    var selectZ =  document.getElementById("selectZ");
    var fromD = document.getElementById("fromD");
    var fromZ = document.getElementById("fromZ");

    //注册
    btnZ.onclick = function(){
            $.ajax({
                 type: "post",
                 // dataType: "json",
                 url: "http://localhost:8080/users/reg",
                 data: {
                    'username':nameZ.value,
                    'password':passZ.value,
                     'identity':0
                 },
                 success: function (res) {
                    console.log(res);
                    if (!res.error) {
                        alert("注册成功,请重新登录");
                    }else{
                        alert(res.result);
                    }
                 },
                 error: function (res) {
                    // alert(JSON.stringify(res));
                    alert("注册失败："+ JSON.stringify(res));
                 }
            });
        
    };


    //登陆
    btnD.onclick = function() {
            //判断用户登录的是什么身份！
            var urlD;
            var identity;
            if(selectD.value === "售票员") {
                urlD = "../salemen/main-salemen.html";
                identity = 0;
            }
            else {
                urlD = "../manager/main-manager.html";
                identity = 1;
            }
           $.ajax({
                type: "post",
                dataType: "json",
                url: "http://localhost:8080/users/log",
                data: {
                    'username':nameD.value,
                    'password':passD.value,
                    'identity':identity
                },
                success: function (res) {
                    // console.log(res);
                    if (!res.error) {
                        sessionStorage.setItem('indenty',JSON.stringify(res.indenty));
                        window.location = urlD;
                    }else {
                        alert(res.result);
                    }
                },
                error: function () {
                    alert("通信出错！");
                }
            });
        };
};
