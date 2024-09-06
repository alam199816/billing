const db = require('../db/connect.js');

// Controller for handling login logic
const loginControllers = {

  // Rendering the login page
  login: (req, res) => {
    res.render('login', { messages: {} });
  },

  // Handling login form submission
  loginUser: (req, res) => {
    const { EmailAddress, Password } = req.body;

    // Query to fetch email and password from the users table
    const query = `SELECT * FROM users WHERE EmailAddress = ?`;

    db.query(query, [EmailAddress], (err, results) => {
      if (err) {
        console.error('Error fetching user from database:', err);
        return res.status(500).send('Database error');
      }

      if (results.length === 0) {
        // No user found with that email
        return res.render('login', { messages: { error: 'Invalid email or password' } });
      }

      // Check if the password matches
      const user = results[0];
      if (user.Password === Password) {
        // Successful 
        req.session.userIds = user.id;
        req.session.userId = `${user.FirstName} ${user.LastName}`; // Storing user ID in session
        res.redirect('/'); // Redirecting to the dashboard or any secure route
      } else {
        // Password mismatch
        res.render('login', { messages: { error: 'Invalid email or password' } });
      }
    });
  }
};

module.exports = loginControllers;
