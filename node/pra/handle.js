var route = require("./route");

function handle(path,req,res){
    path = path === "" ? "index" : typeof route[path] !== "function" ? "error" : path; 
    route[path](req,res);
}

exports.handle = handle;
