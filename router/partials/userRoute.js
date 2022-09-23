const userRoute = require("express").Router()
const controller = require("../../app/controller")
const { authentication } = require("../../app/middleware")

userRoute.get("/", (req, res) => {
    res.json({ message: "Selamat Datang di Aplikasi Sederhana" })
})

userRoute.get("/all", authentication, controller.api.v1.userController.findAllUsers)
userRoute.get("/user", authentication, controller.api.v1.userController.findOneUser)

userRoute.post("/register", controller.api.v1.userController.RegisterUser)
userRoute.post("/login", controller.api.v1.userController.LoginUser)



module.exports = userRoute