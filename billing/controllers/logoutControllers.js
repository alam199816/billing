const db = require('../db/connect.js');

// Log that the logoutControllers is set up
console.log('Logout Controller is set up and ready to use.');

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as ID ' + db.threadId);
});

// Define the logoutControllers object
const logoutControllers = {
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error logging out:', err);
        return res.redirect('/');
      }

      res.clearCookie('connect.sid'); // Optional: clear the session cookie
      res.redirect('/login');
    });
  }
};

module.exports = logoutControllers;
