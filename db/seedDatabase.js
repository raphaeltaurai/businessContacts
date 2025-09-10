const fs = require('fs');
const path = require('path');
const { getDatabase, closeConnection } = require('./database');

async function seedDatabase() {
    try {
        const db = await getDatabase();
        const collection = db.collection('contact');

        // Create a unique index on the email field to make it the primary key
        await collection.createIndex({ email: 1 }, { unique: true });
        console.log('Created unique index on email field');

        //Read the data.json file
        const dataPath = path.join(__dirname, '../data.json');
        const jsonData = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(jsonData);

        // Clear existing data to avoid duplicates
        await collection.deleteMany({});
        console.log('Cleared existing data');

        // Insert the data into MongoDB
        const result = await collection.insertMany(data.contact);
        console.log(`Inserted ${result.insertedCount} documents`);
        
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await closeConnection();
    }
}

seedDatabase();