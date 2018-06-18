var express = require('express');
const server = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');

var bodyParser = require('body-parser');
// var redisStore = require('connect-redis')(session);

var users = require('./routers/users.js');
var plays = require('./routers/plays.js');
var studio = require('./routers/studio.js');
var schedule = require('./routers/shedule.js');
var tickets = require('./routers/ticket.js');
var seat = require('./routers/seat.js');
var sale = require('./routers/statistics.js');
var keys = [];
for(var i = 0; i < 10000; i ++) {
    keys[i]='a_'+Math.random();
}

server.use(cookieParser(keys));
server.use(session({
	name : 'connect.sid',
	secret : 'connect_sess_redis',
	cookie: {'maxAge':20*60*1000 },
	resave :false,
	saveUninitialized : true
}));

server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    //将外源设为指定的域，比如：http://localhost:8080
    res.header('Access-Control-Allow-Origin', "http://localhost:63342");
    //将Access-Control-Allow-Credentials设为true  允许携带cookie
    res.header('Access-Control-Allow-Credentials', true); 
    next();
});

server.use(bodyParser.urlencoded({ extended: false }));
server.listen(8080);

server.use('/users',users);
server.use('/plays',plays);
server.use('/studio',studio);
server.use('/schedule',schedule);
server.use('/tickets',tickets);
server.use('/seat',seat);
server.use('/sale',sale);
console.log('run at localhost:8080');