function run(){
    $('#login').click();
}
window.onload = function(){
    var btn_login = document.getElementById('login');
    var btn_regi = document.getElementById('register');
    var ul = document.getElementById('user');
    var div = document.getElementById('ka');
    //登陆
    btn_login.onclick = function() {
        var lin = document.createElement('li');
        var inputn = document.createElement('input');
        inputn.type = 'text';
        inputn.id= 'name';
        inputn.setAttribute("placeholder","name");
        lin.appendChild('inputn');
        var lip = document.createElement('li');
        var inputp = document.createElement('input');
        inputp.type = 'text';
        inputp.id= 'password';
        inputn.setAttribute("placeholder","password");
        lip.appendChild('inputp');
        user.appendChild('lin');
        user.appendChild('lip');
        var btnl = document.createElement('button');
        btnl.id = 'login';
        btnl.className = 'modify';
        div.appendChild('btnl');
        if(btn_regi.className === 're_lo'){
            btn_regi.removeClass('re_lo');
        }
        btn_login.className = 're_lo';
        $.ajax({
            type : 'get',
            url : "http://localhost:8080/user/login",
            data: {
                'user_name' : document.getElementById("name").value,
                'password' : document.getElementById("password").value
            },
            success : function(res){
                if(!res.error){
                    window.location = "../" //主界面
                }else{
                    alert(res.result);
                }
            },
            error : function(res){
                alert("登录失败！"+JSON.stringify(res));
            }
        })
    };

    //注册
    btn_regi.onclick = function(){
        var lin = document.createElement('li');
        var inputn = document.createElement('input');
        inputn.type = 'text';
        inputn.id= 'name';
        inputn.setAttribute("placeholder","name");
        lin.appendChild('inputn');
        var lip = document.createElement('li');
        var inputp = document.createElement('input');
        inputp.type = 'text';
        inputp.id= 'password';
        inputn.setAttribute("placeholder","password");
        lip.appendChild('inputp');
        var lit = document.createElement('li');
        var inputt = document.getElementById('input');
        inputt.type = 'text';
        inputt.setAttribute("placeholder",'tel');
        lit.appendChild('inputt');
        user.appendChild('lin');
        user.appendChild('lip');
        user.appendChild('lit');

        var btnr = document.createElement('button');
        button.id = 'login';
        btnr.className = 'modify';
        div.appendChild('btnr');
        if(btn_login.className === 're_lo'){
            btn_login.removeClass('re_lo');
        }
        btn_regi.className = 're_lo';
        $.ajax({
            type : 'get',
            url : "http://localhost:8080/user/login",
            data: {
                'user_name' : document.getElementById("name").value,
                'password' : document.getElementById("password").value
            },
            success : function(res){
                if(!res.error){
                    alert("注册成功，请登录");
                }else{
                    alert(res.result);
                }
            },
            error : function(res){
                alert("注册失败！"+JSON.stringify(res));
            }
        })
    }
};