var express = require("express");
var morgan = require("morgan");
var path = require("path");
var jsonRouter = require("./router/router");
var app = express();

app.use(morgan("short"));

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");

    next();
});


app.use(express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "json")));

app.use("/json/index", jsonRouter);

app.listen(9000);