const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/ordersControllers');

// GET route for fetching and displaying orders
router.get('/', (req, res) => {
  ordersControllers('year', null, new Date().getFullYear(), (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching orders');
    }

    const { orders, sub_orders } = results;

    res.render('orders', {
      title: 'Welcome to the Orders Management System',
      orders,
      sub_orders,
      selected_item: 'None' // Or modify based on filter logic
    });
  });
});

// POST route for handling search/filter functionality
router.post('/orders_query', (req, res) => {
  const time_type = req.body['exampleRadios'];
  let month = req.body['selected_month'];
  let year = req.body['selected_year'];

  // Validate the year
  if (!year) {
    return res.status(400).send('Year is required');
  }

  if (time_type === 'month' && !month) {
    return res.status(400).send('Month is required for month-based filtering');
  }

  // Call the controller with the appropriate parameters
  ordersControllers(time_type, month, year, (err, results) => {
    if (err) {
      console.error('Error in ordersControllers:', err);
      return res.status(500).send('Error fetching filtered data');
    }
    console.log('time_type:', time_type, 'month:', month, 'year:', year);

    const { orders, sub_orders } = results;

    // Render the filtered results
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    let month_name = time_type === 'month' ? monthNames[parseInt(month, 10) - 1] : 'None';

    res.render('orders', {
      title: 'Filtered Orders',
      orders,
      sub_orders,
      selected_item: time_type,
      month_name: month_name,
      year: year
    });
  });
});

module.exports = router;
