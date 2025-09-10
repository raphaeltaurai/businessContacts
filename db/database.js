const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;
let client;

async function connectToMongoDB() {
    try {
        // Check if already connected
        if (client && client.topology && client.topology.isConnected()) {
            console.log('Already connected to MongoDB');
            return db;
        }

        // Create new connection
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        
        console.log('Connected to MongoDB');
        db = client.db(process.env.MONGODB_DB);
        
        return db;
        
    } catch (err) {
        console.error('MongoDB connection error:', err);
        // Retry connection after 5 seconds
        setTimeout(connectToMongoDB, 5000);
        throw err;
    }
}

async function getDatabase() {
    if (!db) {
        await connectToMongoDB();
    }
    return db;
}

async function closeConnection() {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

module.exports = {
    connectToMongoDB,
    getDatabase,
    closeConnection
};