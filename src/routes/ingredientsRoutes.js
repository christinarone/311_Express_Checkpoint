const express = require("express");
let router = new express.Router()
let controller = require("../controllers/ingredientsController");
const checkJwt = require("../checkJwt")


// get summary of items, I need to be logged in
router.get("/ingredients", controller.itemsSummary);

//get detail of a single item, I need to be logged in
router.get("/ingredients/:id", controller.itemDetails);

//create a new item
router.post("/ingredients/new-ingredient",checkJwt, controller.createItem);


//update an item; give it its id
router.put("/ingredients/:id", checkJwt, controller.updateItem);
//I need to add the code so that this works 6/14


// delete and item, given its id
router.delete("/ingredients/:id", checkJwt, controller.deleteItem);

module.exports = router;