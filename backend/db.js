const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "123123",
  host: "localhost",
  port: 5432,
  database: "cooking_helper",
});

module.exports = pool;
