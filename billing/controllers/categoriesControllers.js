const db = require('../db/connect.js');

const categoriesControllers = {
  addCategory: (req, res) => {
    const {Category } = req.body;
    const query = `INSERT INTO categories (Category) VALUES (?)`;

    db.query(query, [Category], (err, result) => {
      if (err) throw err;
      console.log('Category added:', result);
      res.redirect('/categories'); // Redirect to the categories page after insertion
    });
  },

  getCategories: (req, res) => {
    const query = `SELECT * FROM categories`;

    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('categories', { category: results }); // Render the categories page with the fetched data
    });
  },

  deleteCategory: (req, res) => {
    const { deleteid: Category } = req.body;
    const query = `DELETE FROM categories WHERE Category = ?`;

    db.query(query, [Category], (err, result) => {
      if (err) throw err;
      console.log('Category deleted:', result);
      res.redirect('/categories'); // Redirect to the categories page after deletion
    });
  }
};

module.exports = categoriesControllers;
