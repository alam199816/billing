const express = require('express');
const router = express.Router();
const brandsControllers = require('../controllers/brandsControllers');

// Route to fetch and display all brands
router.get('/', brandsControllers.getBrands);

// Route to add a new brand
router.post('/addbrand', brandsControllers.addBrand);

module.exports = router;
