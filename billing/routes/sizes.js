const express = require('express');
const router = express.Router();
const sizesControllers = require('../controllers/sizesControllers');

// Route to fetch and display all sizes
router.get('/', sizesControllers.getSizes);

// Route to add a new size
router.post('/addsize', sizesControllers.addSize);

// Route to delete a size
router.post('/deletesize', sizesControllers.deleteSize);

module.exports = router;
