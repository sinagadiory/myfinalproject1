const { User } = require("../../../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const findAllUsers = async (req, res) => {
    try {
        const { rows } = await User.findAll()
        const data = []
        rows.map((user) => {
            const { id, username } = user;
            const orang = {
                id, username
            }
            data.push(orang)
        })
        res.json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

const RegisterUser = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const { rows, rowCount } = await User.findAll()
        if (email == null || username == null || password == null) return res.status(403).json({ message: "Email,Username atau Password Tidak Boleh Kosong" })
        const id = rowCount == 0 ? 1 : rowCount + 1
        const cekEmail = rows.filter((user) => (user.email == email))
        if (cekEmail.length !== 0) return res.status(403).json({ message: "Email Sudah Terdaftar Gunakan Yang Lain!" })
        const cekUsername = rows.filter((user) => user.username == username)
        if (cekUsername.length !== 0) return res.status(403).json({ message: "Username Sudah Terdaftar Gunakan Yang Lain" })
        const hashpassword = await bcrypt.hash(password, 10)
        const result = await User.addUser(id, email, username, hashpassword)
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const findOneUser = async (req, res) => {
    try {
        const { id } = req.user
        const result = await User.findOne(id)
        res.json(result.rows)
    } catch (error) {
        res.json(error)
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const { rows } = await User.findAll()
        const cekUser = rows.filter((user) => (user.email == email))
        if (cekUser.length === 0) return res.status(403).json({ message: "Wrong Email or Password" })
        const cekPassword = await bcrypt.compare(password, cekUser[0].password)
        if (!cekPassword) return res.status(403).json({ message: "Wrong Email or Password" })
        const { id, username } = cekUser[0]
        const accessToken = jwt.sign({ email, username, id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ message: "Login Success", accessToken })
    } catch (error) {
        res.json(error)
    }
}

module.exports = {
    findAllUsers, RegisterUser, findOneUser, LoginUser
}