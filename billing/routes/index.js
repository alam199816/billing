// const express = require('express');
// const router = express.Router();
// const db = require('../db/connect.js');

// router.get('/', (req, res) => {
//   const userId = req.session.userId;

//   if (!userId) {
//     // If user is not logged in, redirect to the login page
//     return res.redirect('/login');
//   }

//   // Query to count the total number of items from the add_stock table
//   const StockQuery = `SELECT COUNT(quantity) AS totalStock FROM add_stock`;

//   // Query to sum the total amount from the add_stock table
//   const StockValueQuery = `SELECT SUM(Amount) AS StockValue FROM add_stock`;

//   // Query to sum the total amount from the bills table
//   const SalesValueQuery = `SELECT SUM(Amount) AS SalesValue FROM bills`;

//   // Query to sum the total orders from the bills table
//   const OrdersQuery = `SELECT SUM(ItemNo) AS TotalOrders FROM bills`;

//     // Query to count stocks by size
//   const stockBySizeQuery = `SELECT Size, COUNT(quantity) AS sizeCount FROM add_stock GROUP BY Size`;

//    // Query to count stocks by Category
//    const stockByCategoryQuery = `SELECT Category, COUNT(quantity) AS categoryCount FROM add_stock GROUP BY Category`;
//   // Execute both queries
//   db.query(StockQuery, (err, StockResults) => {
//     if (err) {
//       console.error('Error fetching total stock from database:', err);
//       return res.status(500).send('Database error');
//     }
//     const totalStock = StockResults[0].totalStock || 0;

//     db.query(StockValueQuery, (err, StockValueResults) => {
//       if (err) {
//         console.error('Error fetching total stock value from database:', err);
//         return res.status(500).send('Database error');
//       }
//       const StockValue = StockValueResults[0].StockValue || 0;

//       db.query(SalesValueQuery, (err, SalesValueResults) => {
//         if (err) {
//           console.error('Error fetching total sales value from database:', err);
//           return res.status(500).send('Database error');
//         }
    
//         const SalesValue  = SalesValueResults[0].SalesValue  || 0;

//         db.query(OrdersQuery, (err, OrdersResults) => {
//           if (err) {
//             console.error('Error fetching total Total Orders  from database:', err);
//             return res.status(500).send('Database error');
//           }
      
//           const TotalOrders  = OrdersResults[0].TotalOrders  || 0;

//           db.query(stockBySizeQuery, (err, SizeResults) => {
//             if (err) {
//               console.error('Error fetching total Total Orders  from database:', err);
//               return res.status(500).send('Database error');
//             }
        
//             const stockBySize = SizeResults || [];

//             db.query(stockByCategoryQuery, (err, CategoryResults) => {
//               if (err) {
//                 console.error('Error fetching total Total Orders  from database:', err);
//                 return res.status(500).send('Database error');
//               }
          
//               const stockByCategory = CategoryResults || [];

//       // Pass the totalStock and totalStockValue to the view
//       res.render('index', { 
//         title: 'Welcome to the home Management System',
//         userId: userId,
//         totalStock: totalStock,
//         StockValue: StockValue,
//         SalesValue: SalesValue,
//         TotalOrders: TotalOrders,
//         stockBySize: stockBySize,
//         stockByCategory: stockByCategory
//       });
//     });
//     });
//     });
//     });
//     });
//   });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db/connect.js');

router.get('/', async (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    // If user is not logged in, redirect to the login page
    return res.redirect('/login');
  }

  try {
    // Queries
    const stockQuery = `SELECT SUM(quantity) AS totalStock FROM add_stock`;
    const stockValueQuery = `SELECT SUM(Amount * Quantity) AS StockValue FROM add_stock`;
    const salesValueQuery = `SELECT SUM(Amount * Quantity) AS SalesValue FROM bills`;
    const ordersQuery = `SELECT SUM(quantity) AS TotalOrders FROM bills`;
    const stockByBrandQuery = `SELECT Brand, SUM(quantity) AS totalQuantity, ItemName FROM add_stock GROUP BY Brand`;
    const stockByCategoryQuery = `SELECT Category, SUM(quantity) AS totalQuantity FROM add_stock GROUP BY Category`;
    const stockBySizeQuery = `SELECT Size, SUM(quantity) AS totalQuantity, ItemName FROM add_stock GROUP BY Size`;

    // Execute queries asynchronously
    const [stockResults] = await db.promise().query(stockQuery);
    const [stockValueResults] = await db.promise().query(stockValueQuery);
    const [salesValueResults] = await db.promise().query(salesValueQuery);
    const [ordersResults] = await db.promise().query(ordersQuery);
    const [stockBySizeResults] = await db.promise().query(stockBySizeQuery);
    const [stockByCategoryResults] = await db.promise().query(stockByCategoryQuery);
    const [stockByBrandResults] = await db.promise().query(stockByBrandQuery);

    // Variables for rendering
    const totalStock = stockResults[0].totalStock || 0;
    const StockValue = stockValueResults[0].StockValue || 0;
    const SalesValue = salesValueResults[0].SalesValue || 0;
    const TotalOrders = ordersResults[0].TotalOrders || 0;
    const stockBySize = stockBySizeResults || [];
    const stockByCategory = stockByCategoryResults || [];
    const stockByBrand = stockByBrandResults || [];

    // Render the page with the fetched data
    res.render('index', {
      title: 'Welcome to the home Management System',
      userId,
      totalStock,
      StockValue,
      SalesValue,
      TotalOrders,
      stockBySize,
      stockByCategory,
      stockByBrand,
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

