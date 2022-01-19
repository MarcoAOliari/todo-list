const { Pool } = require("pg");

require('dotenv').config();

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT || 5432
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}