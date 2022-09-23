const jwt = require("jsonwebtoken")

const authentication = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split("Bearer ")[1]
    if (!token) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.user = decoded
        next()
    })
}

module.exports = authentication