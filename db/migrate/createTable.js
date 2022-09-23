const pool = require("../../config/pool")

const query = `
CREATE TABLE users (
    id INT  NOT NULL PRIMARY KEY,
    email VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);
`
const query1 = `
CREATE TABLE reflections (
    id INT  NOT NULL PRIMARY KEY,
    success VARCHAR NOT NULL,
    low_point  VARCHAR NOT NULL,
    take_away VARCHAR NOT NULL,
    owner_id INT NOT NULL,
    created_date VARCHAR NOT NULL,
    modified_date VARCHAR NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);
`
pool.query(query, (err, res) => {
    if (err) return console.log(err);
    console.log("Tabel users Created");
    pool.query(query1, (err, res) => {
        if (err) return console.log(err)
        console.log("Tabel reflections Created");
        pool.end()
    })
})