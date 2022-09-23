const pool = require("../../config/pool")

const findAll = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM users")
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const findOne = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM users WHERE id=$1", [id])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const addUser = (id, email, username, password) => {
    const query = {
        text: 'INSERT INTO users(id, email,username,password) VALUES($1, $2,$3,$4) RETURNING id,email,username,password',
        values: [id, email, username, password],
    }
    return new Promise((resolve, reject) => {
        pool.query(query)
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = { findAll, addUser, findOne }