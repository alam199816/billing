// const express = require('express');
// const router = express.Router();
// const stocksControllers = require('../controllers/stocksControllers');
// // Initialize the controller
// router.get('/stocks', stocksControllers);
// router.post('/submitstock');

// // Define a route for the root path
// router.get('/', (req, res) => {
//   // Assuming you fetch the categories, brands, and sizes from your database or controller
//   const category = [
//     { Category: 'Shirt' },
//     { Category: 'Pants' },
//     { Category: 'Shoes' }
//     // Add more categories as needed
//   ];

//   const brand = [
//     { Brand: 'Nike' },
//     { Brand: 'Adidas' },
//     { Brand: 'Puma' }
//     // Add more brands as needed
//   ];

//   const size = [
//     { Size: 'S' },
//     { Size: 'M' },
//     { Size: 'L' },
//     { Size: 'XL' }
//     // Add more sizes as needed
//   ];

//   res.render('stocks', { title: 'Welcome to the home Management System', category, brand, size });
// });

// // Define a POST route to handle form submissions and insert data into the database
// router.post('/submitstock', (req, res) => {
//   const { ItemID, ItemName, Category, Brand, Size, Amount } = req.body;
//   // Insert query to add the data into the add_stock table
//   const query = `INSERT INTO add_stock (ItemID, ItemName, Category, Brand, Size, Amount) VALUES (?, ?, ?, ?, ?, ?)`;

//   // Execute the query with the values from the form
//   db.query(query, [ItemID, ItemName, Category, Brand, Size, Amount], (err, result) => {
//     if (err) throw err;
//     console.log('Data inserted into add_stock table:', result);
//     res.redirect('/stocks'); // Redirect to the main page after insertion
//   });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const stocksControllers = require('../controllers/stocksControllers');

// Handle GET request to render the stocks page
router.get('/', stocksControllers.getStocksPage);

// Handle POST request to submit stock data
router.post('/submitstock', stocksControllers.submitStock);

module.exports = router;
