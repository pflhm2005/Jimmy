var express = require("express");
var path = require("path");
var morgan = require("morgan");
var bodyParser = require("body-parser")
var jsonRouter = require("./routers/json_router");

var app = express();

app.use(morgan("short"));

app.use(bodyParser.urlencoded({extended: true}));

//确定静态路径 东西全在这里面
app.use(express.static(path.join(__dirname,"demo")));

app.use((err,req,res,next)=>{
    res.status(403);
    res.send("404 not found!!!");
});

// "/demo/json/路径请求会被转接到该路由"
app.use("/json",jsonRouter);

app.listen(9000,()=>{
    console.log("start");
});