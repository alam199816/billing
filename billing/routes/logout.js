const express = require('express');
const router = express.Router();
const logoutControllers = require('../controllers/logoutControllers');

// Logout route
router.delete('/logout', logoutControllers.logout);

router.delete('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error logging out:', err);
        return res.redirect('/'); // Redirect to home page or show an error page
      }
  
      // Successfully logged out
      res.clearCookie('connect.sid'); // Optional: clear the session cookie
      res.redirect('/login'); // Redirect to the login page
    });
  });
module.exports = router;
