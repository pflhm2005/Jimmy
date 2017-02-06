var read = require("./fn");
var url = require("url");
var querystring = require("querystring");

function login(req,res){
    // var rdata = url.parse(req.url,true).query;
    // if(rdata.username == 1 && rdata.pwd == 1){
    //     read.read("./login.html",req,res);
    // }
    // else{
    //     res.write("登录失败");
    //     read.read("./register.html",req,res);
    // }
    var post = "";
    req.on("data",chunk=>post+=chunk);
    req.on("end",()=>{
        post = querystring.parse(post);
        if(post.username == 1 && post.pwd == 1){
            read.read("./login.html",req,res);
        }
        else{
            res.write("登录失败");
            register(req,res);
        }
    });
}
function register(req,res){
    read.read("./register.html",req,res);
}
function index(req,res){
    read.read("./index.html",req,res);
}
function error(req,res){
    res.write("404 not found");
    res.end();
}
function pic(req,res){
    read.readPic("./1.jpg",req,res);
}

exports.pic = pic;
exports.index = index;
exports.error = error;
exports.login = login;
exports.regi = register;