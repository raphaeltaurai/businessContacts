const express = require('express');
const contactController = require('../controllers/contact');
const router = express.Router();

// GET all contacts
router.get('/', contactController.getData);

// GET a specific contact by email
router.get('/:email', contactController.getContactByEmail);

// POST create a new contact
router.post('/', contactController.createContact);

// PUT update a contact by email
router.put('/:email', contactController.updateContact);

// DELETE a contact by email
router.delete('/:email', contactController.deleteContact);

module.exports = router;