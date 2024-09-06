
const db = require('../db/connect.js');

const ordersControllers = (time_type, month, year, callback) => {
  console.log('orders Controller is set up and ready to use.');

  // Ensure year is an integer
  year = parseInt(year, 10);

  if (isNaN(year)) {
    return callback(new Error('Invalid year'), null);
  }

  let query;
  let params = [];

  if (time_type === 'month') {
    // Ensure month is an integer
    month = parseInt(month, 10);

    if (isNaN(month)) {
      return callback(new Error('Invalid month'), null);
    }

    // Query for month-based filter
    query = `
      SELECT 
       ItemNo, 
        SUM(Amount) AS Amount, 
        date, 
        time 
      FROM bills
      WHERE Month(date) = ? AND YEAR(date) = ? 
      GROUP BY ItemNo
    `;
    params = [month, year];
  } else if (time_type === 'year') {
    // Query for year-based filter
    query = `
      SELECT 
        ItemNo, 
        SUM(Amount) AS Amount, 
        date, 
        time 
      FROM bills
      WHERE YEAR(date) = ? 
      GROUP BY ItemNo
    `;
    params = [year];
  }

  db.query(query, params, (error, results) => {
    if (error) {
      console.error('Query execution failed: ' + error);
      return callback(error, null);
    }

    console.log('Data fetched successfully');

    // Fetch sub_orders
    const subOrdersQuery = 'SELECT * FROM bills';
    db.query(subOrdersQuery, [], (err1, subOrdersResults) => {
      if (err1) {
        console.error('Fetching sub_orders failed: ' + err1);
        return callback(err1, null);
      }

      // Return both orders and sub_orders
      callback(null, { orders: results, sub_orders: subOrdersResults });
    });
  });
};

module.exports = ordersControllers;
