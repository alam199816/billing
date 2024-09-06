const db = require('../db/connect.js');

const viewstocksControllers = {
 
getViews:(req, res) => {
    // Query to fetch all stocks
    const stockQuery = `SELECT * FROM add_stock`;

    // Query to fetch data from brands and categories tables
    const brandsQuery = `SELECT * FROM brands`;
    const categoryQuery = `SELECT * FROM categories`;

    // Execute all queries using Promise.all to ensure data is fetched before rendering
    Promise.all([
      new Promise((resolve, reject) => {
        db.query(stockQuery, (err, stockResults) => {
          if (err) reject(err);
          resolve(stockResults);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(brandsQuery, (err, brandResults) => {
          if (err) reject(err);
          resolve(brandResults);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(categoryQuery, (err, categoryResults) => {
          if (err) reject(err);
          resolve(categoryResults);
        });
      })
    ])
    .then(([stockResults, brandResults, categoryResults]) => {
      // Render the viewstocks page and pass the results and brands/categories to the EJS template
      res.render('viewstocks', { 
        title: 'View Stocks', 
        all_stocks: stockResults,
        brands: brandResults,
        categories: categoryResults,
        filter_type: req.query.filter_type || 'None'
      });
    })
    .catch((err) => {
      console.error('Error fetching data: ', err);
      res.status(500).send('Error fetching data');
    });
  },
  deleteViews:(req, res) => {
    const { deleteid } = req.body;
    const deleteQuery = 'DELETE FROM add_stock WHERE ItemID = ?';
  
    db.query(deleteQuery, [deleteid], (err, result) => {
      if (err) {
        console.error('Failed to delete stock: ', err);
        return res.status(500).send('Failed to delete stock');
      }
  
      console.log('Stock deleted successfully:', result);
      // Redirect or send a success response
      res.redirect('/viewstocks');
    });
  },

  filterViews: (req, res) => {
    const { Brand, Category } = req.body;

    let filterQuery = `SELECT * FROM add_stock`;
    let filterParams = [];

    if (Brand) {
      filterQuery += ` WHERE Brand = ?`;
      filterParams.push(Brand);
    } else if (Category) {
      filterQuery += ` WHERE Category = ?`;
      filterParams.push(Category);
    }

    db.query(filterQuery, filterParams, (err, results) => {
      if (err) {
        console.error('Error filtering stocks: ', err);
        return res.status(500).send('Error filtering stocks');
      }

      // Render the filtered stocks on the viewstocks page
      res.render('viewstocks', { 
        title: 'Filtered Stocks',
        all_stocks: results, // Ensure `all_stocks` is passed
        brands: [],  // If you need to pass brands/categories, update this
        categories: [],  // Same here
        filter_type: Brand ? 'brand' : 'category',
        filter_name: Brand || Category,
        display_content: results // Adjusted for filtered display
      });
    });
  }

  
};



module.exports = { viewstocksControllers};
