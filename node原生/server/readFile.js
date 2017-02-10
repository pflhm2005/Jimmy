var fs = require("fs");

function readFile(path,req,res){
    function recall(data){
        res.write(data);
        res.end();
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            recall("404 not found");
        }
        else{
            if(/.css$/.test(path)){
                res.writeHead(200,{"Content-Type":"text/css"});
            }
            recall(data);
        }
    });
}

exports.readFile = readFile;