const db = require('../db/connect.js');

const brandsControllers = {
  addBrand: (req, res) => {
    const { Brand } = req.body;
    
    // if (!BrandName) {
    //   return res.status(400).send('Brand cannot be empty');
    // }

    const query = `INSERT INTO brands (Brand) VALUES (?)`;

    db.query(query, [Brand], (err, result) => {
      if (err) throw err;
      console.log('Brand added:', result);
      res.redirect('/brands'); // Redirect to the brands page after insertion
    });
  },

  getBrands: (req, res) => {
    const query = `SELECT * FROM brands`;

    db.query(query, (err, results) => {
      if (err) throw err;
      res.render('brands', { brand: results }); // Render the brands page with the fetched data
    });
  }
};

module.exports = brandsControllers;
