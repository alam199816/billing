const express = require('express');
const router = express.Router();
const billControllers = require('../controllers/billControllers');

// Define a route to fetch categories, brands, and sizes
router.get('/', billControllers.initialize);

// Define a POST route for fetching item details
router.post('/fetchitem', billControllers.fetchItem);

// Define a POST route for submitting the bill
router.post('/submitbill', billControllers.submitBill);

module.exports = router;
