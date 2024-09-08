const express = require('express');
const router = express.Router();
const stock_filterControllers = require('../controllers/stock_filterControllers');

// GET route to display the stock filter page
router.get('/', (req, res) => {
  res.render('stock_filter', { title: 'Stock Filter Management', filter_type: 'all' });
});

// POST route to handle filter form submission
router.post('/stock_filter_query', (req, res) => {
  const filterType = req.body.exampleRadios1;

  if (filterType === 'brand') {
    stock_filterControllers.getBrands((err, results) => {
      if (err) {
        return res.status(500).send('Error fetching brands');
      }
      res.render('stock_filter', { 
        title: 'Stock Filter Management',
        filter_type: 'brand',
        display_content: results,
        total_items: [{ quantity: results.reduce((sum, item) => sum + item.quantity, 0) }] // Sum of all quantities
      });
    });
  } else if (filterType === 'category') {
    stock_filterControllers.getCategories((err, results) => {
      if (err) {
        return res.status(500).send('Error fetching categories');
      }
      res.render('stock_filter', { 
        title: 'Stock Filter Management',
        filter_type: 'category',
        display_content: results,
        total_items: [{ quantity: results.reduce((sum, item) => sum + item.quantity, 0) }] // Sum of all quantities
      });
    });
  } else {
    res.status(400).send('Invalid filter type selected');
  }
});

module.exports = router;
