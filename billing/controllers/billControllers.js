const db = require('../db/connect.js');

const billControllers = {

  initialize: (req, res) => {
    const brandQuery = 'SELECT DISTINCT Brand FROM add_stock';
    const categoryQuery = 'SELECT DISTINCT Category FROM add_stock'; 
    const sizeQuery = 'SELECT DISTINCT Size FROM add_stock';

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
        res.render('bill', {
          title: 'Welcome to the Bill Management System',
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

  fetchItem: (req, res) => {
    const { itemid } = req.body;
    const query = 'SELECT * FROM add_stock WHERE ItemID = ?';

    db.query(query, [itemid], (err, rows) => {
      if (err) {
        console.error('Failed to fetch item:', err);
        return res.status(500).json({ status: 'failed', message: 'Failed to fetch item' });
      }

      res.status(200).json({ status: 200, rows });
    });
  },

  submitBill: (req, res) => {
    const { ItemNo, ItemID, ItemName, Category, Brand, Size, Amount, quantity, date, time, customer1 } = req.body;

    const billsQuery = `
      INSERT INTO bills (ItemNo, ItemID, ItemName, Category, Brand, Size, Amount, quantity, date, time, PhoneNumber)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const subOrdersQuery = `
      INSERT INTO sub_orders (ItemNo, Amount, date, time)
      VALUES (?, ?, ?, ?)
    `;

    const updateStockQuery = `
      UPDATE add_stock
      SET quantity = quantity - ?
      WHERE ItemID = ?
    `;

    db.beginTransaction((err) => {
      if (err) {
        console.error('Failed to start transaction:', err);
        return res.status(500).json({ status: 'failed', message: 'Transaction failed to start' });
      }

      // Insert into the bills table
      db.query(billsQuery, [ItemNo, ItemID, ItemName, Category, Brand, Size, Amount, quantity, date, time, customer1], (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.error('Failed to submit bill:', err);
            return res.status(500).json({ status: 'failed', message: 'Failed to submit bill' });
          });
        }

        // Insert into the sub_orders table
        db.query(subOrdersQuery, [ItemNo, Amount, date, time], (err, result) => {
          if (err) {
            return db.rollback(() => {
              console.error('Failed to submit sub_order:', err);
              return res.status(500).json({ status: 'failed', message: 'Failed to submit sub_order' });
            });
          }

          // Update stock quantity
          db.query(updateStockQuery, [quantity, ItemID], (err, result) => {
            if (err) {
              return db.rollback(() => {
                console.error('Failed to update stock:', err);
                return res.status(500).json({ status: 'failed', message: 'Failed to update stock' });
              });
            }

            // Commit the transaction
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  console.error('Failed to commit transaction:', err);
                  return res.status(500).json({ status: 'failed', message: 'Transaction commit failed' });
                });
              }

              res.redirect('/bill');
            });
          });
        });
      });
    });
  }

};

module.exports = billControllers;
