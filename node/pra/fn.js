var fs = require("fs");

function readfile(path,req,res){
    function recall(data){
        res.write(data);
        res.end();
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            recall(err);
        }
        else{
            recall(data);
        }
    });
}

function readPic(path,req,res){
    res.writeHead(200,{"Content-Type":"image/jpeg"});
    function recall(data){      
        res.write(data,"binary");
        res.end();
    }
    fs.readFile(path,"binary",(err,data)=>{
        if(err){
            recall(err);
        }
        else{
            recall(data);
        }
    })
}

exports.readPic = readPic;
exports.read = readfile;