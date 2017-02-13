var express = require("express"),
    path = require("path"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    jsonRouter = require("./routers/json_router");

var app = express();

//打印日志
app.use(morgan("short"));

//好像没什么卵用
app.use(bodyParser.urlencoded({extended: true}));

//确定静态路径 东西全在这里面
app.use(express.static(path.join(__dirname,"demo")));

app.use((err,req,res,next)=>{
    res.status(403);
    res.send("404 not found!!!");
});

// 路径为"./demo/json/请求会被转接到该路由"
app.use("/json",jsonRouter);

app.listen(9000,()=>{
    console.log("start");
});
