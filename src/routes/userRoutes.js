const express = require("express");
let router = new express.Router()
let controller = require("../controllers/usersController");

// router.get("/users", controller.getUsers);

//create a route to get one userby id
// router.get("/users:id", controller.getOneUser);

//create a route to create a new user
router.post("/users", controller.signUp);
router.post("/login", controller.login);

module.exports = router;