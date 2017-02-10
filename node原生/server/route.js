var read = require("./readFile");

function index(path,req,res){
    read.readFile(path,req,res);
}

function blog(str,req,res){
    read.readFile("./json/"+str,req,res);
}



exports.index = index;
exports.blog = blog;