const connection = require("../model/db");
const mysql = require("mysql")
// function to return a summary of the items on the response
let itemsSummary = function (req, res) {
    console.log('item summary')
    let sql = "SELECT * FROM recipes"

    connection.query(sql, (err, results) => {
        res.status(200).json(results)
    })
}

// function to return the detail of a single item on the response
//I need to finish the function for this one below #14
let itemDetails = function (req, res) {
    console.log("itemDetails");

    // we are extracting the id from the routes parameters & saving it to a variable called id
    // this is defined in our route: /recipes/:id-- (express knows this is a variable)
    const id = req.params.id
    console.log(id)
    // we are selecting a recipe from its id from the mySQL db.
    let sql = "SELECT * FROM recipes WHERE id = ?"
    connection.query(sql, [id], (err, results) => {
        //Check for any unexpected errors first
        if (err) {
            console.log(err)
            return res.status(400).json({ error: err, message: "There was an unexpected error", sqlError: err.sqlMessage })
        }
        // Check if results has a length of 0, meaning no results for that Id
        if (results.length === 0) {
            return res.status(400).json("There is no recipes with that Id.")
        }
        // Otherwise, ID exists and we want to return the result.
        else {
            return res.status(200).json(results)
        }
    })
    //res.sendStatus(204);
}
//this is condensed form//
//function to create a new item
let createItem = function (req, res) {
    const { user_id, recipe_name, recipe_description, recipe_thumbnail } = req.body
    const sql = `
        INSERT INTO recipes (user_id, recipe_name, recipe_description, recipe_thumbnail)
        VALUES (?, ?, ?, ?);
    `
    connection.query(sql, [user_id, recipe_name, recipe_description, recipe_thumbnail], (err, results) => {
        if (err) return res.status(400).json({ error: err })
        res.status(200).json(results)
    })
}
//who owns the recipe on line 46?
//function to update an item
//I need to add a way to update a recipe
let updateItem = function (req, res) {
    console.log("updateItem");
    const id = req.params.id
    let sql = "UPDATE FROM recipes WHERE id = ?"
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ error: err, message: "The recipe was updated", sqlError: err.sqlMessage })
        }
        else {
            return res.sendStatus(204);
        }
    })

    //I need the code to update an recipe, pass in id to update 6/14
}

//function to delete an item
// I need to add a way to delete a recipe
let deleteItem = function (req, res) {
    console.log("deleteItem");
    const id = req.params.id
    let sql = "DELETE FROM recipes WHERE id = ?"
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ error: err, message: "There was an unexpected error", sqlError: err.sqlMessage })
        }
        else {
            return res.status(200).json(results)
        }
    })
}

module.exports = {
    itemDetails, itemsSummary, createItem, updateItem, deleteItem
}
