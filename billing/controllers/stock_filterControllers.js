
const db = require('../db/connect.js');

const stock_filterControllers = {
  getBrands: (callback) => {
    const query = "SELECT DISTINCT Brand, Size,  quantity, Amount FROM add_stock";
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
    const query = "SELECT DISTINCT Category, Size, quantity, Amount FROM add_stock";
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
