var http = require("http");     //for respond & response, need to import http module
var fs = require("fs");         //read document, need to import fs module

var server = http.createServer((req,res) => {

    if (req.url == "/"){
        fs.readFile("index.html", (err,html) => {  //index.html den err ve html dönecek
            res.write(html);
            res.end();  //en sonda mutlaka res.end() denir. response u sonlandırmak içim
        });

    }else if (req.url == "/products"){
        fs.readFile("urunler.html", (err,html) => {
            res.write(html);
            res.end();  //en sonda mutlaka res.end() denir. response u sonlandırmak içim
        });

    }else{
        fs.readFile("404.html", (err,html) => {
            res.write(html);
            res.end();  //en sonda mutlaka res.end() denir. response u sonlandırmak içim
        });

    }
});

server.listen(3000, () => {     //For listening port

    console.log("node.js server at port 3000");

});
