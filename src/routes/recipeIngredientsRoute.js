const express = require("express");
let router = new express.Router()
let controller = require("../controllers/recipeIngredientsController");
const checkJwt = require("../checkJwt")


// get summary of all recipe ingredients
router.get('/recipe-ingredients', controller.itemsSummary)

// create recipe ingredient relationship? data
router.post('/recipe-ingredients', controller.createRecipeIngredient)


module.exports = router;