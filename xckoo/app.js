var express = require("express");
var morgan = require("morgan");
var path = require("path");
var jsonRouter = require("./router/router");
var app = express();

app.use(morgan("short"));

app.use(express.static(path.join(__dirname,"static")));
app.use(express.static(path.join(__dirname,"json")));

app.use("/json/index",jsonRouter);

app.listen(9000);