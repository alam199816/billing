const express = require('express');
const router = express.Router();
const db = require('../db/connect.js');

router.get('/', (req, res) => {
  const userId = req.session.userId;

  if (!userId) {
    // If user is not logged in, redirect to the login page
    return res.redirect('/login');
  }

  // Query to count the total number of items from the add_stock table
  const StockQuery = `SELECT COUNT(ItemNo) AS totalStock FROM add_stock`;

  // Query to sum the total amount from the add_stock table
  const StockValueQuery = `SELECT SUM(Amount) AS StockValue FROM add_stock`;

  // Query to sum the total amount from the bills table
  const SalesValueQuery = `SELECT SUM(Amount) AS SalesValue FROM bills`;

  // Query to sum the total orders from the bills table
  const OrdersQuery = `SELECT SUM(ItemNo) AS TotalOrders FROM bills`;

    // Query to count stocks by size
  const stockBySizeQuery = `SELECT Size, COUNT(*) AS sizeCount FROM add_stock GROUP BY Size`;

   // Query to count stocks by Category
   const stockByCategoryQuery = `SELECT Category, COUNT(*) AS categoryCount FROM add_stock GROUP BY Category`;
  // Execute both queries
  db.query(StockQuery, (err, StockResults) => {
    if (err) {
      console.error('Error fetching total stock from database:', err);
      return res.status(500).send('Database error');
    }
    const totalStock = StockResults[0].totalStock || 0;

    db.query(StockValueQuery, (err, StockValueResults) => {
      if (err) {
        console.error('Error fetching total stock value from database:', err);
        return res.status(500).send('Database error');
      }
      const StockValue = StockValueResults[0].StockValue || 0;

      db.query(SalesValueQuery, (err, SalesValueResults) => {
        if (err) {
          console.error('Error fetching total sales value from database:', err);
          return res.status(500).send('Database error');
        }
    
        const SalesValue  = SalesValueResults[0].SalesValue  || 0;

        db.query(OrdersQuery, (err, OrdersResults) => {
          if (err) {
            console.error('Error fetching total Total Orders  from database:', err);
            return res.status(500).send('Database error');
          }
      
          const TotalOrders  = OrdersResults[0].TotalOrders  || 0;

          db.query(stockBySizeQuery, (err, SizeResults) => {
            if (err) {
              console.error('Error fetching total Total Orders  from database:', err);
              return res.status(500).send('Database error');
            }
        
            const stockBySize = SizeResults || [];

            db.query(stockByCategoryQuery, (err, CategoryResults) => {
              if (err) {
                console.error('Error fetching total Total Orders  from database:', err);
                return res.status(500).send('Database error');
              }
          
              const stockByCategory = CategoryResults || [];

      // Pass the totalStock and totalStockValue to the view
      res.render('index', { 
        title: 'Welcome to the home Management System',
        userId: userId,
        totalStock: totalStock,
        StockValue: StockValue,
        SalesValue: SalesValue,
        TotalOrders: TotalOrders,
        stockBySize: stockBySize,
        stockByCategory: stockByCategory
      });
    });
    });
    });
    });
    });
  });
});

module.exports = router;
