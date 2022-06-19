const express = require("express");
const bodyParser = require("body-parser");
let dotenv = require("dotenv");
dotenv.config();

//get the app servers port from env, fallback on port 8000 if not configured
const PORT = process.env.PORT || 3330;

let app = express();

app.use(bodyParser.json())
app.use(express.static('public'))

//get the route definition
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
//tell the express app to use the routes
app.use(recipeRoutes);
app.use(userRoutes);

// start the express app and log what port I'm in
//HERE add the static html page
app.listen(PORT, function(){
    console.log("Api Server started on port", PORT);
});

