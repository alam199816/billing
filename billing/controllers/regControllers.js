const db = require('../db/connect.js');


const regControllers = {

   register:(req, res) => {
    res.render('register'); 
  },

  registerUser: (req, res) => {
    const { FirstName, LastName, EmailAddress, Password, RepeatPassword  } = req.body;

    // SQL query to insert data into the users table
    const query = `INSERT INTO users (FirstName, LastName, EmailAddress, Password, RepeatPassword ) VALUES (?, ?, ?, ?, ?)`;

    // Execute the query
    db.query(query, [FirstName, LastName, EmailAddress, Password, RepeatPassword ], (err, result) => {
      if (err) {
        console.error('Error inserting data into users table:', err);
        return res.status(500).send('Database error');
      }
      console.log('User registered successfully:', result);
      res.redirect('/login'); // Redirect after successful registration
    });
  }
};

module.exports = regControllers;
