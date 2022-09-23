const pool = require("../../config/pool")


const findAll = () => {
    // const query = "SELECT * FROM reflections"
    const query = "SELECT reflections.id,reflections.success,reflections.low_point,reflections.take_away,reflections.owner_id,reflections.created_date,reflections.modified_date,users.username,users.email FROM reflections INNER JOIN users ON reflections.owner_id=users.id ORDER by id ASC"
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

const findOne = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM reflections where id=$1", [id])
            .then((result) => {
                resolve(result)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

const createReflection = (id, success, low_point, take_away, owner_id, created_date, modified_date) => {
    return new Promise((resolve, reject) => {
        pool.query("INSERT INTO reflections values($1,$2,$3,$4,$5,$6,$7) RETURNING *", [
            id, success, low_point, take_away, owner_id, created_date, modified_date
        ]).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}

const updateReflection = (success, low_point, take_away, modified_date, id) => {
    return new Promise((resolve, reject) => {
        pool.query("UPDATE reflections SET success=$1, low_point=$2, take_away=$3,modified_date=$4 WHERE id=$5 RETURNING * ", [success, low_point, take_away, modified_date, id])
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
    })
}

const deleteReflection = (id) => {
    return new Promise((resolve, reject) => {
        pool.query("DELETE FROM reflections where id=$1", [id])
            .then(() => {
                resolve("Berhasil Dihapus")
            })
            .catch(() => {
                reject("Gagal Dihapus")
            })
    })
}

// SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
// FROM Orders
// INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;

module.exports = {
    findAll, findOne, createReflection, deleteReflection, updateReflection
}