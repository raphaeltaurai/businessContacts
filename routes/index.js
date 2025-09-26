const express = require('express');
const router = express.Router();

// Import route modules
const contactRoutes = require('./contact');
const swaggerRoutes = require('./swagger');

//root router
router.get('/', (req, res) => {
    res.send('Hello world');
});

// Mount routes
router.use('/contact', contactRoutes);
router.use('/api-docs', swaggerRoutes);

module.exports = router;
