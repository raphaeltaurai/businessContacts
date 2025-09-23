
// Get all contacts
async function getData(req, res, next) {
    try {
        const db = req.app.locals.db;
        const collection = db.collection('contact');
        // Find all contacts from MongoDB
        const data = await collection.find({}).toArray();
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'Contacts data not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get a specific contact by email
async function getContactByEmail(req, res, next) {
    try {
        const { email } = req.params;
        const db = req.app.locals.db;
        const collection = db.collection('contact');
        // Find contact by email (primary key)
        const contact = await collection.findOne({ email });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        console.error('Error fetching contact from MongoDB:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const { v4: uuidv4 } = require('uuid');

// Create a new contact
async function createContact(req, res, next) {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        // Validate required fields
        if (!email || !firstName || !lastName) {
            return res.status(400).json({ 
                message: 'Email, firstName, and lastName are required' 
            });
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: 'Invalid email format' 
            });
        }
        const db = req.app.locals.db;
        const collection = db.collection('contact');
        // Check if contact with this email already exists
        const existingContact = await collection.findOne({ email });
        if (existingContact) {
            return res.status(409).json({ 
                message: 'Contact with this email already exists' 
            });
        }
        // Create new contact with userId
        const newContact = {
            userId: uuidv4(),
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };
        const result = await collection.insertOne(newContact);
        res.status(201).json({ 
            message: 'Contact created successfully',
            contact: newContact
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update a contact by userId
async function updateContact(req, res, next) {
    try {
        const { userId } = req.params;
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        const db = req.app.locals.db;
        const collection = db.collection('contact');
        // Check if contact exists
        const existingContact = await collection.findOne({ userId });
        if (!existingContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        // Update contact (email can be changed now)
        const updateData = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (email !== undefined) updateData.email = email;
        if (favoriteColor !== undefined) updateData.favoriteColor = favoriteColor;
        if (birthday !== undefined) updateData.birthday = birthday;
        const result = await collection.updateOne(
            { userId },
            { $set: updateData }
        );
        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: 'No changes made' });
        }
        // Get updated contact
        const updatedContact = await collection.findOne({ userId });
        res.status(200).json({ 
            message: 'Contact updated successfully',
            contact: updatedContact
        });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Delete a contact by email
async function deleteContact(req, res, next) {
    try {
        const { email } = req.params;
        const db = req.app.locals.db;
        const collection = db.collection('contact');
        // Check if contact exists
        const existingContact = await collection.findOne({ email });
        if (!existingContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        // Delete contact
        const result = await collection.deleteOne({ email });
        if (result.deletedCount === 0) {
            return res.status(400).json({ message: 'Failed to delete contact' });
        }
        res.status(200).json({ 
            message: 'Contact deleted successfully',
            deletedContact: existingContact
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getData,
    getContactByEmail,
    createContact,
    updateContact,
    deleteContact
};