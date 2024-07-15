const express = require("express");
const app = express();
const db = require("./data/db");
const { MongoDBCollectionNamespace } = require("mongodb");
const port = 3000;
const userRoutes = require("./routes/users");

app.set("view engine","ejs");  // using ejs for view engine
app.use(express.static('public'));  //to access to public file img, js, css etc.
app.use(express.static('node_modules'));  //to access to the node_modules for using bootstrap





async function startServer() {
    try {
        await db.connectToDatabase();    
        console.log('Database connection is successful!');
        
        app.use(userRoutes);   //to access to the routes page
        // Sunucuyu başlat
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err);
    }
}

startServer();

        
