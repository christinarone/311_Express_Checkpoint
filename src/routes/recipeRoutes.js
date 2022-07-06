const express = require("express");
let router = new express.Router()
let controller = require("../controllers/recipeController");
const checkJwt = require("../checkJwt")


// get summary of items, I need to be logged in
router.get("/recipes",checkJwt, controller.itemsSummary);

//get detail of a single item, I need to be logged in
router.get("/recipes/:id", controller.itemDetails);

//create a new item
router.post("/recipes/new-recipe", controller.createItem);


//update an item; give it its id
router.put("/recipes/:id", controller.updateItem);
//I need to add the code so that this works 6/14


// delete and item, given its id
router.delete("/recipes/:id", controller.deleteItem);

module.exports = router;