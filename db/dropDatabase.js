const { Pool } = require("pg")
const config = require("../config/config")

const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: "",
    password: config.DB_PASSWORD,
    port: 5432,
})

pool.query(`DROP DATABASE ${config.DB_DATABASE}`, (err, res) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`Database ${config.DB_DATABASE} Drop `)
    pool.end()
})