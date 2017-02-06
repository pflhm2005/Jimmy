
var http = require("http");
var url = require("url");
var handler = require("./handle");

http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    if(req.url !== "/favicon.ico"){
        var path = url.parse(req.url).pathname;
        path = path.replace("/","");
        handler.handle(path,req,res);
    }
}).listen(9000);
