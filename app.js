const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const usersRoutes = require('./routes/users');
const {MongoClient} = require('mongodb')
require('dotenv').config();
const database = require('./db/database');


app.use(bodyParser.json());
app.use((req,res, next) => {res.setHeader("Access-Control-Allow-Origin", "*"); 
    next();
});
app.use('/', require('./routes/'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {console.log(`Server is running on port  http://localhost:${PORT}`);});