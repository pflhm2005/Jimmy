var express = require("express");
var app = express();
var path = require("path");

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    // res.render("index",{
    //     message:"Hey everyone!This is my webpage."
    // });
    res.render("2Dparabox");
});

app.listen(9000);