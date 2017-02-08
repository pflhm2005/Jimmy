var mysql = require("mysql");


var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"111111",
    database:"node",
    port:"3306"
});

connection.connect(err=>{
    if(err){
        console.log("query "+err);
        return ;
    }
    console.log("connction connect succeed !");
});

connection.end(err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("connection end succeed !");
});