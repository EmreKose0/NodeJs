const { MongoClient,ObjectId} = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;

const config = require("../config");    //to the get db info from config.js
const uri = config.db.uri;
const dbName = config.db.dbName;


const client = new MongoClient(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

let db;
let collection;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('MongoDB connection is successful!');
        db = client.db(dbName);  // database
        collection = db.collection('NodeDB');   // collection
    } catch (err) {
        console.error('MongoDB connection failed:', err);
    }
}

function getDb() {
    if (!db) {
        throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return db;
}

function getCollection() {
    if (!collection) {
        throw new Error('Collection not initialized. Call connectToDatabase first.');
    }
    return collection;
}

module.exports = { connectToDatabase, getDb, getCollection, ObjectId};   //send function type