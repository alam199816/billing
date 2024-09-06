
const db = require('../db/connect.js');

// Define a controller function
const indexControllers = () => {
  // You can include any setup code or basic operations here
  console.log('Index Controller is set up and ready to use.');

  // Just for demonstration, you could include a simple query later
  // or check the connection status if needed:
  
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL database as ID ' + db.threadId);
  });
};

// Export the controller
module.exports = indexControllers;
