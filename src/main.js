require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
//get the app servers port from env, fallback on port 8000 if not configured
const PORT = process.env.PORT || 3330;

let app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

//get the route definition
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const instructionRoutes = require('./routes/instructionsRoutes');
const measurementsRoutes = require('./routes/measurementsRoutes');
const ingredientsRoutes = require('./routes/ingredientsRoutes');
const recipeIngredientsRoutes = require('./routes/recipeIngredientsRoute');


//tell the express app to use the routes
app.use(recipeRoutes);
app.use(userRoutes);
app.use(instructionRoutes);
app.use(measurementsRoutes);
app.use(ingredientsRoutes);
app.use(recipeIngredientsRoutes);

// start the express app and log what port I'm in
//HERE add the static html page
app.listen(PORT, function () {
    console.log("Api Server started on port", PORT);
});

