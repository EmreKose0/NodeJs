const express = require("express");
const app = express();
app.set("view engine","ejs");  // using ejs for view engine
app.use(express.static('public'));  //to access to public file img, js, css etc.
app.use(express.static('node_modules'));  //to access to the node_modules for using bootstrap

const data = [                                  //Create list 
    {id:1, name:"iphone14", price:30000, imgUrl:"1.jpeg"},
    {id:2, name:"iphone15", price:40000, imgUrl:"2.jpeg"},
    {id:3, name:"iphone16", price:50000, imgUrl:"3.jpeg"},
    {id:4, name:"iphone17", price:60000, imgUrl:"4.jpeg"}
]

app.use("/products/:id", function(req,res){ // for /, function gonna send homepage
    const productID = data.find(p => p.id == req.params.id)   //find the id of item  
    res.render("productDetails",productID);           //for send to info to the productdetails
});

app.use("/products", function(req,res){ // for /, function gonna send homepage
    res.render("products",{                 
        product: data                   //send data like object
    });
});

app.use("/", function(req,res){ // for /, function gonna send homepage
    res.render("index");
});

app.listen(3000, () =>{      //for descb listening port
    console.log("listening on port 3000");
})