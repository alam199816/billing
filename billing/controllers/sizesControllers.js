const db = require('../db/connect.js');

const sizesControllers = {
  addSize: (req, res) => {
    const { Size } = req.body;
    const query = `INSERT INTO sizes (Size) VALUES (?)`;

    db.query(query, [Size], (err, result) => {
      if (err) throw err;
      console.log('Size added:', result);
      res.redirect('/sizes'); // Redirect to the sizes page after insertion
    });
  },

  getSizes: (req, res) => {
    const query = `SELECT * FROM sizes`;

    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('sizes', { size: results }); // Render the sizes page with the fetched data
    });
  },

  deleteSize: (req, res) => {
    const { deleteid: Size } = req.body;
    const query = `DELETE FROM sizes WHERE Size = ?`;

    db.query(query, [Size], (err, result) => {
      if (err) throw err;
      console.log('Size deleted:', result);
      res.redirect('/sizes'); // Redirect to the sizes page after deletion
    });
  }
};

module.exports = sizesControllers;
