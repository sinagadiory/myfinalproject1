const pool = require("../../config/pool")

pool.query("DROP TABLE reflections", (err, res) => {
    if (err) return console.log(err);
    console.log("DROP TABLE reflections");
    pool.query("DROP TABLE users", (err, res) => {
        if (err) return console.log(err);
        console.log("DROP TABLE users")
        pool.end()
    })
})