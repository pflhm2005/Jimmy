var http = require("http");
var url = require("url");
var handler = require("./server/handle");
var fs =require("fs");

function isEmptyObject(obj){
    for(let name in obj){
        return false;
    }
    return true;
}

http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    if(req.url !== "/favicon.ico"){
        var path = url.parse(req.url,true);
        var rdata = path.query,
            urlPath = path.pathname.replace("/","");
        isEmptyObject(rdata) ? handler.handleUrl(urlPath,req,res) : handler.handleReq(rdata,req,res);
    }
}).listen(9000);