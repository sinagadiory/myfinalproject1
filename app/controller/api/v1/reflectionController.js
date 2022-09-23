const { Reflection } = require("../../../models")

const findAllReflectionUser = async (req, res) => {
    try {
        const { rows } = await Reflection.findAll()
        const userID = req.user.id
        const result = rows.filter((reflection) => (reflection.owner_id == userID))
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}

const findOneReflection = async (req, res) => {
    try {
        const { id } = req.params
        const { rows } = Reflection.findOne(id)
        res.json(rows)
    } catch (error) {
        res.json(error)
    }
}

const createReflection = async (req, res) => {
    try {
        const { rowCount, rows } = await Reflection.findAll()
        const userID = req.user.id
        const { success, low_point, take_away } = req.body
        if (success == null || low_point == null || take_away == null) return res.status(403).json({ message: "success,low_point,atau take_away tidak boleh kosong!" })
        const id = rowCount == 0 ? 1 : (rows[rows.length - 1].id + 1);
        const created_date = new Date().toLocaleString("id-ID")
        const modified_date = new Date().toLocaleString("id-ID")
        const result = await Reflection.createReflection(id, success, low_point, take_away, userID, created_date, modified_date)
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateReflection = async (req, res) => {
    try {
        let { success, low_point, take_away } = req.body
        const owner_id = req.user.id
        const { id } = req.params
        const modified_date = new Date().toLocaleString("id-ID")
        const { rows } = await Reflection.findOne(id)
        if (rows.length === 0) return res.json({ message: "Data Tidak Ditemukan" })
        if (success == null) {
            success = rows[0].success
        }
        if (low_point == null) {
            low_point = rows[0].low_point
        }
        if (take_away == null) {
            take_away = rows[0].take_away
        }
        if (rows[0].owner_id != owner_id) {
            res.status(403).json({ message: "Anda Tidak Boleh Mengedit yang bukan punya Anda!" })
            return
        }
        const result = await Reflection.updateReflection(success, low_point, take_away, modified_date, id)
        res.json(result.rows[0])
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}

const deleteReflection = async (req, res) => {
    try {
        const { id } = req.params
        const owner_id = req.user.id
        const { rows } = await Reflection.findOne(id)
        if (rows.length === 0) return res.json({ message: "Data Tidak Ditemukan" })
        if (rows[0].owner_id != owner_id) {
            res.status(403).json({ message: "Anda Tidak Boleh Menghapus yang bukan punya Anda!" })
            return
        }
        const result = await Reflection.deleteReflection(id)
        res.json({ message: result })
    } catch (error) {
        res.json(error)
    }
}


module.exports = {
    findAllReflectionUser, findOneReflection, createReflection, deleteReflection, updateReflection
}