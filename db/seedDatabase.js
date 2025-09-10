const {MongoClient} = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function seedDatabase() => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try{
    await client.connect();
    console.log('connected to MongoDB');

    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('contact');

    //Read the data.json file
    const dataPath = path.join(__dirname, '../data.json');
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(jsonData);

    //Insert the data into MongoDB
    const result = await collection.insertOne(data);
    console.log(`Inserted document with ID: ${result.insertedId}`);
}
  catch (error) {
    console.error('Error seeding database:', error);}
  finally {
    await client.close();}
}

seedDatabase();
