window.onload = function(){
    alert(1);
    var sched_id = sessionStorage.getItem('sched_id');
    var data = JSON.parse(sessionStorage.getItem('data'));
    console.log('data:',data);
    console.log(play_id);
    $.ajax({
       type : "get",
       url : "http://localhost:8080/schedule/gpas",
       data :{
           'sched_id' : sched_id//所选剧目的ID
       },
        success : function(res){
           if(!res.error){
                $('#img').innerHTML = res.result.imgage;//剧目图片
                $('#name').innerHTML = res.result.play_name;//剧目名
                $('#type').innerHTML = res.result.play_type_id;//剧目类型
                $('#studio').innerHTML = res.result.studio_name;//演出厅名
                $('#timeP').innerHTML = res.result.sale_time;//演出时间
                $('#seat').innerHTML = res.result.seat;//所选座位
                $('#phone').innerHTML = res.result.user_tel;//用户手机号
                $('#subtotal').innerHTML = res.result.subtotal;//小记
           }else{
                alert(res.result);
           }
        },
        error : function(res){
            alert("加载失败！"+JSON.stringify(res));
        }
    });
    // $('#confirm').onclick = function(){
    //     $.ajax({
    //         type : "get",
    //         url : "http://localhost:8080/",
    //         data :{
    //             'play_id' :
    //         },
    //         success : function(res){
    //             if(!res.error){
    //                 alert("购票成功！");
    //                 window.location = "../user-center/user-center.html";
    //             }else{
    //                 alert(res.result);
    //             }
    //         },
    //         error : function(res){
    //             alert("加载失败！"+JSON.stringify(res));
    //         }
    //     });
    // }
};