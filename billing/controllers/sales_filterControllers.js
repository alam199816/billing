const db = require('../db/connect.js');
const sales_filterControllers = {
  getSalesFilter: (req, res) => {
    const query = 'SELECT date, ItemName, Amount FROM bills';
    const sumQuery = 'SELECT SUM(Amount) AS total_amount FROM bills';
    const countQuery = 'SELECT COUNT(DISTINCT itemNo) AS total_count FROM bills';

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data from bills table:', err);
        return res.status(500).send('Server Error');
      }

      db.query(sumQuery, (err, sumResults) => {
        if (err) {
          console.error('Error fetching total amount:', err);
          return res.status(500).send('Server Error');
        }

        db.query(countQuery, (err, countResults) => {
          if (err) {
            console.error('Error fetching total count:', err);
            return res.status(500).send('Server Error');
          }

          const time_type = 'month'; 
          const filter_type = 'all'; 
          const display_content = results;
          const month_name = 'August';
          const year = 2024;

          const total_amount = sumResults[0].total_amount;
          const total_count = countResults[0].total_count;

          res.render('sales_filter', { 
            title: 'Welcome to the sales_filter Management System',
            time_type,        
            filter_type,      
            display_content,
            month_name,
            total_amount,
            total_count,
            year
          });
        });
      });
    });
  },

  postSalesFilterQuery: (req, res) => {
    const { selected_month, selected_year, exampleRadios1 } = req.body;
    const time_type = 'month'; // Define as needed
    const filter_type = exampleRadios1 || 'all';

    let query = 'SELECT date, ItemName, Amount FROM bills WHERE 1=1';
    let sumQuery = 'SELECT SUM(Amount) AS total_amount FROM bills WHERE 1=1';
    let countQuery = 'SELECT COUNT(DISTINCT itemNo) AS total_count FROM bills WHERE 1=1';
    const queryParams = [];

    if (selected_month) {
      query += ' AND MONTH(date) = ?';
      sumQuery += ' AND MONTH(date) = ?';
      countQuery += ' AND MONTH(date) = ?';
      queryParams.push(selected_month);
    }

    if (selected_year) {
      query += ' AND YEAR(date) = ?';
      sumQuery += ' AND YEAR(date) = ?';
      countQuery += ' AND YEAR(date) = ?';
      queryParams.push(selected_year);
    }

    if (exampleRadios1 === 'brand') {
      query += ' AND Brand = ?';
      sumQuery += ' AND Brand = ?';
      countQuery += ' AND Brand = ?';
      queryParams.push(req.body.selected_brand); // Ensure correct brand is passed
    } else if (exampleRadios1 === 'category') {
      query += ' AND Category = ?';
      sumQuery += ' AND Category = ?';
      countQuery += ' AND Category = ?';
      queryParams.push(req.body.selected_category); // Ensure correct category is passed
    }

    db.query(query, queryParams, (err, results) => {
      if (err) {
        console.error('Error fetching filtered data from bills table:', err);
        return res.status(500).send('Server Error');
      }

      db.query(sumQuery, queryParams, (err, sumResults) => {
        if (err) {
          console.error('Error fetching total amount:', err);
          return res.status(500).send('Server Error');
        }

        db.query(countQuery, queryParams, (err, countResults) => {
          if (err) {
            console.error('Error fetching total count:', err);
            return res.status(500).send('Server Error');
          }

          const total_amount = sumResults[0].total_amount;
          const total_count = countResults[0].total_count;

          res.render('sales_filter', {
            title: 'Filtered Sales',
            time_type,        
            filter_type,       
            display_content: results,
            month_name: selected_month,
            year: selected_year,
            total_amount,
            total_count
          });
        });
      });
    });
  }
};

module.exports = sales_filterControllers;
