const db = require('../db/connect.js');

const stocksControllers = {
  // Fetch brands, categories, and sizes
  getStocksPage: (req, res) => {
    const brandQuery = `SELECT * FROM brands`;
    const categoryQuery = `SELECT * FROM categories`;
    const sizeQuery = `SELECT * FROM sizes`;

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
        res.render('stocks', {
          title: 'Welcome to the Home Management System',
          category: categoryResults,
          brand: brandResults,
          size: sizeResults
        });
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        res.status(500).send('Server Error');
      });
  },

  // Insert stock details into the add_stock table
  submitStock: (req, res) => {
    const { ItemID, ItemName, Category, Brand, Size, Amount, quantity } = req.body;

    const today = new Date();

    // Format StockDate as YYYY-MM-DD (MySQL preferred date format)
    const StockDate = today.toISOString().split('T')[0]; // This will give you YYYY-MM-DD format

    // Format StockTime as HH:MM:SS
    const StockTime = today.toTimeString().split(' ')[0];

    const query = `
      INSERT INTO add_stock (ItemID, ItemName, Category, Brand, Size, Amount, quantity, StockDate, StockTime) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [ItemID, ItemName, Category, Brand, Size, Amount, quantity, StockDate, StockTime], (err, result) => {
      if (err) throw err;
      console.log('Data inserted into add_stock table:', result);
      res.redirect('/stocks');
    });
  }
};

module.exports = stocksControllers;
