const express = require('express');
const router = express.Router();
const loginControllers = require('../controllers/loginControllers');

// Route to display the login page
router.get('/login', loginControllers.login);

// Route to handle login form submission
router.post('/login', loginControllers.loginUser);

module.exports = router;
