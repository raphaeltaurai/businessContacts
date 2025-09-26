const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();
require('dotenv').config();
const database = require('./db/database');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors({
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

// Serve static files from the frontend directory
//app.use(express.static(path.join(__dirname, '../frontend')));

// Initialize database connection
database.connectToMongoDB()
    .then(db => {
        app.locals.db = db;
    })
    .catch(err => {
        console.error('Failed to connect to database:', err);
    });

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {console.log(`Server is running on port  http://localhost:${PORT}`);});