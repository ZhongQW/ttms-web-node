var getAllSale = function(db,callback){
    var sql = 'SELECT user_id,sale_payment FROM  sale';
    var sq = 'SELECT userID,username FROM users WHERE type = 0';

    db.query(sql,function(err,data){
        console.log(err,data);
        if(err){
            callback({
                'error' : true,
                'result' : '数据库出错'
            })
        }else{
            var sale = [];//存放所有销售记录
            var m = [];
            
            sale = JSON.parse(JSON.stringify(data));
            db.query(sq,function(err,data){//存放所有售票员的id和姓名
                console.log(err,data);
                if(err){
                    callback({
                        'error' : true,
                        'result' : '数据库出错'
                    })
                }else{
                    var money = 0;
                    var count = 0;
                    data = JSON.parse(JSON.stringify(data));
                    console.log(data);
                    for( var i = 0; i < data.length; i ++) {
                        for( var j = 0; j < sale.length; j ++) {
                            if(data[i].userID === sale[j].user_id) {
                                money += sale[j].sale_payment;
                                count ++;
                            }
                        }
                        var mobj = {
                            'username' : data[i].username,
                            'saleMoney' : money,
                            'count' : count
                        }
                        m.push(mobj);
                        money = 0;
                        count = 0;
                    }
                    callback({
                        'error' : false,
                        'result' :JSON.parse(JSON.stringify(m))
                    })
                }
            })
        }
    })
}

module.exports = getAllSale;