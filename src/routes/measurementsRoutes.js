const express = require("express");
let router = new express.Router()
const controller = require("../controllers/measurementsConroller")

const checkJwt = require("../checkJwt")


// get summary of items
router.get("/measurements", controller.itemsSummary);

//get detail of a single item
router.get("/measurements/:id", controller.itemDetails);

//create a new item
router.post("/measurements/new-measurement", controller.createItem);


//update an item; give it its id
router.put("/measurements/:id", controller.updateItem);
//I need to add the code so that this works 6/14


// delete and item, given its id
router.delete("/measurements/:id", controller.deleteItem);

// I can edit the instructions one at a time, but that's problematic. How can I edit the instuctions all
// at once for a recipe? Figure this out and change the routes to fix this. The routes I have now work but I
// may have issues later. Missing routes for ingredients, measurement --what's on the tables.


module.exports = router;