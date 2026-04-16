const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mini-data-platform-01",
  password: "tushar",
  port: 5432,
});

module.exports = pool;