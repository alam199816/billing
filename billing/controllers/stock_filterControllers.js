// const db = require('../db/connect.js');

// const stock_filterControllers = () => {

//   console.log('stocks_filter Controller is set up and ready to use.');

//   db.connect((err) => {
//     if (err) {
//       console.error('Database connection failed: ' + err.stack);
//       return;
//     }
//     console.log('Connected to MySQL database as ID ' + db.threadId);
//   });
// };

// module.exports = stock_filterControllers;

const db = require('../db/connect.js');

const stock_filterControllers = {
  getBrands: (callback) => {
    const query = "SELECT DISTINCT Brand, Amount FROM add_stock";
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching brands: ' + err.stack);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  getCategories: (callback) => {
    const query = "SELECT DISTINCT Category, Amount FROM add_stock";
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching categories: ' + err.stack);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  }
};

module.exports = stock_filterControllers;
