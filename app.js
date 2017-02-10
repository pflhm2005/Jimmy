var express = require("express");
var path = require("path");
var morgan = require("morgan");
// var demoRouter = require("./routers/demo_router");

var app = express();

app.use(morgan("short"));

app.use(express.static(path.join(__dirname,"demo")));

app.use((err,req,res,next)=>{
    res.status(404);
    res.send("404 not found");
});

app.listen(9000,()=>{
    console.log("App started on port 9000");
});