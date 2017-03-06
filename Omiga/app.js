var express = require('express');
var app = express();
var morgan = require('morgan');
app.use(morgan('short'));
var path = require('path');

var apiRouter = require("./router/api_router");

var bodyParser = require('body-parser');

//为了解析post 这个需要在主配置中引用
app.use(bodyParser.urlencoded({ extended: false }));

//默认根路径会指向index.html
//需要在前面使用get劫持请求然后重定向
app.get('/', function(req, res) {
    console.log(12);
    res.redirect('./login.html');
});

//设定静态路径 所有请求优先在此路径查找
//不要把服务器配置JS文件和静态页面放在同一个文件夹！！！！
app.use(express.static(path.join(__dirname, 'static')));

app.use("/index", apiRouter);

app.listen(9000);