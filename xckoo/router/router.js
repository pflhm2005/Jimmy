var express = require("express");
var path = require("path");

var json_Router = express.Router();

var sourcePath = path.join(__dirname,"../json/index");

json_Router.get("/:url",(req,res)=>{
    if(req.params.url === "all"){
        res.sendFile(sourcePath + "/index_slide.json");
    }
    else{
        res.sendFile(sourcePath + "/index_" + req.params.url + ".json");
    }
});

module.exports = json_Router;