var route = require("./route");

function handleUrl(path,req,res){
    path = path === "" ? "index.html" : path;
    route.index(path,req,res);
}

function handleReq(rdata,req,res){
    for(var name in rdata){
        route[name](rdata[name],req,res);
    }
}

exports.handleUrl = handleUrl;
exports.handleReq = handleReq;