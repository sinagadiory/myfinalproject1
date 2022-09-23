const { userRoute, reflectionRoute } = require("./partials")
const controller = require("../app/controller")
const router = require("express").Router()
const { authentication } = require("../app/middleware")

router.use("/api/v1/users", userRoute)

router.use(authentication)
router.use("/api/v1/reflections", reflectionRoute)

router.use(controller.api.main.onLost)
router.use(controller.api.main.onError)

module.exports = router