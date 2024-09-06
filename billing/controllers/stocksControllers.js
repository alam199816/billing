const db = require('../db/connect.js');

const stocksControllers = {
   getStocksPage: (req, res) => {
    // Query to fetch brands from the database
    const brandQuery = `SELECT * FROM brands`;

    // Query to fetch categories from the database
    const categoryQuery = `SELECT * FROM categories`;

    // Query to fetch sizes from the database
    const sizeQuery = `SELECT * FROM sizes`;

    // Execute all queries using Promise.all to ensure all data is fetched before rendering
    Promise.all([
      new Promise((resolve, reject) => {
        db.query(brandQuery, (err, brandResults) => {
          if (err) reject(err);
          resolve(brandResults);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(categoryQuery, (err, categoryResults) => {
          if (err) reject(err);
          resolve(categoryResults);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(sizeQuery, (err, sizeResults) => {
          if (err) reject(err);
          resolve(sizeResults);
        });
      })
    ])
      .then(([brandResults, categoryResults, sizeResults]) => {
        // Render the stocks page with the fetched data
        res.render('stocks', {
          title: 'Welcome to the Home Management System',
          category: categoryResults,
          brand: brandResults,
          size: sizeResults
        });
      })
      .catch((err) => {
        // Handle errors if any of the queries fail
        console.error('Error fetching data:', err);
        res.status(500).send('Server Error');
      });
  },

  submitStock: (req, res) => {
    const { ItemID, ItemName, Category, Brand, Size, Amount } = req.body;

    const today = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const StockDate = today.toLocaleDateString('en-IN', options);
    const StockTime = today.toTimeString().split(' ')[0];

    // Insert query to add the data into the add_stock table
    const query = `INSERT INTO add_stock (ItemID, ItemName, Category, Brand, Size, Amount, StockDate, StockTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the query with the values from the form
    db.query(query, [ItemID, ItemName, Category, Brand, Size, Amount, StockDate, StockTime], (err, result) => {
      if (err) throw err;
      console.log('Data inserted into add_stock table:', result);
      res.redirect('/stocks'); // Redirect to the main page after insertion
    });
  }
};

module.exports = stocksControllers;
