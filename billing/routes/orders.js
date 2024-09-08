const express = require('express');
const router = express.Router();
const { ordersControllers, deleteOrderItem } = require('../controllers/ordersControllers');

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
      selected_item: 'None' 
    });
  });
});

// POST route to delete an item
router.post('/deleteitem', (req, res) => {
  const ItemNo = req.body.deleteid;

  if (!ItemNo) {
    return res.status(400).send('Item ID is required for deletion');
  }

  // Call the deleteOrderItem function
  deleteOrderItem(ItemNo, (err, result) => {
    if (err) {
      return res.status(500).send('Error deleting item');
    }

    console.log('Item deleted successfully with ID:', ItemNo);
    // Redirect to the orders page after deletion
    res.redirect('/');
  });
});

// POST route for handling search/filter functionality
router.post('/orders_query', (req, res) => {
  const time_type = req.body['exampleRadios'];
  let month = req.body['selected_month'];
  let year = req.body['selected_year'];

  if (!year) {
    return res.status(400).send('Year is required');
  }

  if (time_type === 'month' && !month) {
    return res.status(400).send('Month is required for month-based filtering');
  }

  ordersControllers(time_type, month, year, (err, results) => {
    if (err) {
      console.error('Error in ordersControllers:', err);
      return res.status(500).send('Error fetching filtered data');
    }

    const { orders, sub_orders } = results;
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
