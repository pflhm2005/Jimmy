var express = require("express");
var path = require("path");
var url = require("url");

var jsonReq_Router = express.Router();

jsonReq_Router.get("/comment",(req,res)=>{
    res.sendFile(path.join(__dirname,"../demo/json/comment.json"));
});

jsonReq_Router.get("/cart",(req,res)=>{
    res.sendFile(path.join(__dirname,"../demo/json/cart.json"));
});

jsonReq_Router.get("/yhd/:url",(req,res)=>{
    var urlPath = req.params.url;
    res.sendFile(path.join(__dirname,"../demo/json/yhd_"+ urlPath +".json"));
});

module.exports = jsonReq_Router;