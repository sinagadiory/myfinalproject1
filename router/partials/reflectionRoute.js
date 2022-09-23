const reflectionRoute = require("express").Router()

const controller = require("../../app/controller")

reflectionRoute.get("/", controller.api.v1.reflectionController.findAllReflectionUser)
// reflectionRoute.get("/tes", controller.api.v1.reflectionController.tesReflections)

reflectionRoute.post("/", controller.api.v1.reflectionController.createReflection)

reflectionRoute.put("/:id", controller.api.v1.reflectionController.updateReflection)

reflectionRoute.delete("/:id", controller.api.v1.reflectionController.deleteReflection)

module.exports = reflectionRoute