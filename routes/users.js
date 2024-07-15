const express = require("express");
const router = express.Router();    //router
const db = require("../data/db");

router.get("/products/:id", async function(req, res) {
    try {
        const collection = db.getCollection(); 
        const id = req.params.id;       //url param.
        console.log(id);
        // const myId = new db.ObjectId(id);            //we can use objectid for unique id
        // console.log(myId);
        const data = await collection.find({}).toArray();
        
        console.log(data[id-1]);
        if (!data[id-1]) {
            return res.status(404).send('Product not found');
        }
        res.render("productDetails",{
            products:data[id-1]});
    } catch (err) { 
        console.error('Data fetching error:', err);
        res.status(500).send('Server Error!');
    }
});

router.use("/products", async function(req,res){ // for /, function gonna send homepage
    try {
        const collection = db.getCollection(); // access to collection
        const data = await collection.find({}).toArray();
        console.log(data);
        res.render("products", {
            products: data
        });
    } catch (err) { 
        console.error('Data fetching error:', err);
        res.status(500).send('Server Error!');
    }
    
});
router.get("/", async function (req, res) {
    try {
        const collection = db.getCollection(); 
        const data = await collection.find({}).toArray();
        console.log(data);
        res.render("index", {
            products: data
        });
    } catch (err) {
        console.error('Data fetching error:', err);
        res.status(500).send('Server Error!');
    }
});


module.exports = router;