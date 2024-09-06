const express = require('express');
const router = express.Router();
const sales_filterControllers = require('../controllers/sales_filterControllers');

// Route to handle GET request for sales filter page
router.get('/', sales_filterControllers.getSalesFilter);

// Route to handle POST request for filtering sales
router.post('/sales_filter_query', sales_filterControllers.postSalesFilterQuery);

module.exports = router;
