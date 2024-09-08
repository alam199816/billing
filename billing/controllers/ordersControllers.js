const db = require('../db/connect.js');

// Function to delete an item by ItemID
const deleteOrderItem = (ItemNo, callback) => {
  const deleteQuery = `DELETE FROM bills WHERE ItemNo = ?`;

  db.query(deleteQuery, [ItemNo], (err, result) => {
    if (err) {
      console.error('Error deleting item: ', err);
      return callback(err, null);
    }

    console.log('Item deleted successfully:', ItemNo);
    callback(null, result);
  });
};

// Function to fetch orders and sub-orders
const ordersControllers = (time_type, month, year, callback) => {
  console.log('orders Controller is set up and ready to use.');

  year = parseInt(year, 10);
  if (isNaN(year)) {
    return callback(new Error('Invalid year'), null);
  }

  let query;
  let params = [];

  if (time_type === 'month') {
    month = parseInt(month, 10);
    if (isNaN(month)) {
      return callback(new Error('Invalid month'), null);
    }

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

    const subOrdersQuery = 'SELECT * FROM bills';
    db.query(subOrdersQuery, [], (err1, subOrdersResults) => {
      if (err1) {
        console.error('Fetching sub_orders failed: ' + err1);
        return callback(err1, null);
      }

      callback(null, { orders: results, sub_orders: subOrdersResults });
    });
  });
};

module.exports = {
  ordersControllers,
  deleteOrderItem
};
