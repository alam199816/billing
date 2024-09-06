const express = require('express');
const router = express.Router();
const { viewstocksControllers } = require('../controllers/viewstocksControllers');

// Define a route for fetching stock data
router.get('/', viewstocksControllers.getViews);

// Define a POST route for deleting stock
router.post('/deletestock', viewstocksControllers.deleteViews);

// Define a POST route for filtering stocks by brand or category
router.post('/stocks_query', viewstocksControllers.filterViews);

module.exports = router;
