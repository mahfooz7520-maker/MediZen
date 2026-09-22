const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST?.trim(),
  user: process.env.DB_USER?.trim(),
  password: process.env.DB_PASSWORD?.trim(),
  database: process.env.DB_NAME?.trim(),
  port: Number(process.env.DB_PORT || 3306),

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  connectTimeout: 15000,

  enableKeepAlive: true,
  keepAliveInitialDelay: 30000,

  charset: "utf8mb4",
});


// =============================
// Test MySQL Connection
// =============================

db.getConnection((err, connection) => {

  if (err) {

    console.error("❌ MySQL Connection Failed");
    console.error("Code:", err.code);
    console.error("Message:", err.message);

    return;
  }

  console.log("✅ MySQL Database Connected Successfully");

  connection.release();
});


// =============================
// MySQL Pool Error
// =============================

db.on("error", (err) => {

  console.error("❌ MySQL Pool Error");
  console.error("Code:", err.code);
  console.error("Message:", err.message);

});


module.exports = db;