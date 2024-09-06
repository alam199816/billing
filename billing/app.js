// const express = require("express");
// const session = require('express-session');
// const MySQLStore = require('express-mysql-session')(session);
// const dotenv = require("dotenv");
// const path = require("path");

// // Load environment variables at the very beginning
// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const options = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 3306,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// };

// console.log({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// const sessionStore = new MySQLStore(options);
// app.use(session({
//   secret: 'k.alam', 
//   resave: false,
//   store: sessionStore,
//   saveUninitialized: true,
//   // cookie: { secure: false } 
//   cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } 
// }));

// const port = process.env.PORT || 1700;

// app.use(express.static(path.join(__dirname, 'public')));
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// // const receipt = require('./routes/receipt');
// const index = require('./routes/index');
// // const admin = require('./routes/admin');
// // const addToCartRouter = require('./routes/add_to_cart');

// // app.use('/add_to_cart', addToCartRouter);
// // app.use('/',receipt);
// app.use('/', index);
// // app.use('/cart', index);
// // app.use('/checkout', index);
// // app.use('/contact', index);
// // app.use('/detail', index);
// // app.use('/shop', index);
// // app.use('/login', index);
// // app.use('/logout', index);
// // app.use('/register', index);
// // app.use('/admin', admin);

// app.listen(port, () => {
//     console.log(`Server is running on ${port}`);
// });

const express = require("express");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const dotenv = require("dotenv");
const path = require("path");
const methodOverride = require('method-override');
// Load environment variables
dotenv.config();
// dotenv.config({ path: path.resolve(__dirname, '.env') });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log environment variables
console.log({
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME
});

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

console.log({
  host: options.host,
  user: options.user,
  password: options.password,
  database: options.database
});

const sessionStore = new MySQLStore(options);
app.use(session({
  secret: 'k.alam',
  resave: false,
  store: sessionStore,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

const port = process.env.PORT || 1400;

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride('_method'));

const logout = require('./routes/logout');
app.use('/', logout);
const index = require('./routes/index');
app.use('/', index);

const bill = require('./routes/bill');
app.use('/bill', bill);

const orders = require('./routes/orders');
app.use('/orders', orders);

const sales_filter = require('./routes/sales_filter');
app.use('/sales_filter', sales_filter);

const sizes = require('./routes/sizes');
app.use('/sizes', sizes);

const stocks = require('./routes/stocks');
app.use('/stocks', stocks);

const brands = require('./routes/brands');
app.use('/brands', brands);

const categories = require('./routes/categories');
app.use('/categories', categories);

const stock_filter = require('./routes/stock_filter');
app.use('/stock_filter', stock_filter);

const viewstocks = require('./routes/viewstocks');
app.use('/viewstocks', viewstocks);

const register = require('./routes/reg');
app.use('/register',register);

const login = require('./routes/login');
app.use('/',login);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
