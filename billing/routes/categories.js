const express = require('express');
const router = express.Router();
const categoriesControllers = require('../controllers/categoriesControllers');

// Route to fetch and display all categories
router.get('/', categoriesControllers.getCategories);

// Route to add a new category
router.post('/addcategory', categoriesControllers.addCategory);

// Route to delete a category
router.post('/deletecategory', categoriesControllers.deleteCategory);

module.exports = router;
