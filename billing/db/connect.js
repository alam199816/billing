const mysql = require('mysql2');
const dotenv = require("dotenv");
// const path = require('path');

// Load environment variables
// dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();
console.log(process.env, 'hey there');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// console.log({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as ID ' + db.threadId);
});

module.exports = db;
