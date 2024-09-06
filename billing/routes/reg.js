const express = require('express');
const router = express.Router();
const regControllers = require('../controllers/regControllers');

// Route to display the login page
router.get('/', regControllers.register);

// Route to handle login form submission
router.post('/register', regControllers.registerUser);

module.exports = router;
