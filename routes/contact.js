const express = require('express');
const contactController = require('../controllers/contact');
const router = express.Router();

//GET /feed /post
router.get('/', contactController.getData);
//localhost:3000/contacts;

module.exports = router;