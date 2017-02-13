var express = require("express");
var path = require("path");

var jsonReq_Router = express.Router();

//设置json文件夹根目录
var sourcePath = path.join(__dirname,"../demo/json/");

//处理微博评论json请求
jsonReq_Router.get("/comment",(req,res)=>{
    res.sendFile(sourcePath + "/comment.json");
});

//处理购物车json请求
jsonReq_Router.get("/cart/:url",(req,res)=>{
    res.sendFile(sourcePath + "/cart_" + req.params.url + ".json");
});

//处理一号店json请求
jsonReq_Router.get("/yhd/:url",(req,res)=>{
    res.sendFile(sourcePath + "/yhd_"+ req.params.url +".json");
});

module.exports = jsonReq_Router;