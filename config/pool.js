const { Pool } = require("pg")
// const dotenv = require("dotenv")
const config = require("./config")
// dotenv.config();


const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_DATABASE.toLocaleLowerCase(),
    password: config.DB_PASSWORD,
    port: 5432,
})

module.exports = pool