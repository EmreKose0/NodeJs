const express = require("express");
const app = express();
const db = require("./data/db");
const { MongoDBCollectionNamespace } = require("mongodb");
const port = 3000;

app.set("view engine","ejs");  // using ejs for view engine
app.use(express.static('public'));  //to access to public file img, js, css etc.
app.use(express.static('node_modules'));  //to access to the node_modules for using bootstrap



// app.use("/products/:id", function(req,res){ // for /, function gonna send homepage
//     const productID = data.find(p => p.id == req.params.id)   //find the id of item  
//     res.render("productDetails",productID);           //for send to info to the productdetails
// });



async function startServer() {
    try {
        await db.connectToDatabase();    
        console.log('Database connection is successful!');
        
        app.get("/products/:id", async function(req, res) {
            try {
                const collection = db.getCollection(); 
                const id = req.params.id;       //url param.
                console.log(id);
                // const myId = new db.ObjectId(id);
                // console.log(myId);
                const data = await collection.find({}).toArray();
                
                console.log(data[id]);
                if (!data[id]) {
                    return res.status(404).send('Product not found');
                }
                res.render("productDetails",{
                    products:data[id]});
            } catch (err) { 
                console.error('Data fetching error:', err);
                res.status(500).send('Server Error!');
            }
        });

        app.use("/products", async function(req,res){ // for /, function gonna send homepage
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
        app.get("/", async function (req, res) {
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

        // Sunucuyu başlat
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
}

startServer();

        
