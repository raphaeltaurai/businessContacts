exports.getData = async (req, res, next) => {
    try {
        const db = req.app.locals.db;
        const collection = db.collection('contact');
        
        // Find the professional data from MongoDB
        const data = await collection.find({}).toArray();
        
        if (!data) {
            return res.status(404).json({ message: 'Contacts data not found' });
        }
        
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};