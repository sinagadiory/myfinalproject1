const express = require("express")
const router = require("../router")
const bodyParser = require("body-parser")
const dotenv = require('dotenv')
const app = express()

dotenv.config()
app.use(bodyParser.json())
app.use(router)

module.exports = app