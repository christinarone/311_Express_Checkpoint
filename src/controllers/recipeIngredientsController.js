const { connect } = require("../model/db");
const connection = require("../model/db");

const itemsSummary=(req, res)=>{
    const sql = "SELECT * FROM recipe_ingredients"
    connection.query(sql, (err, rows)=>{
        res.json(rows)
    })

}

const createRecipeIngredient = (req, res) => {
    console.log("Inside /POST recipe-ingredient route")
    console.log(req.body)
    const {recipe_id, ingredient, amount, measurement_id} = req.body
    let sql1 = `SELECT * FROM ingredients WHERE ingredient = ?`
    let sql2 = `INSERT INTO ingredients (ingredient) VALUES (?)`
    let sql3 = `INSERT INTO recipe_ingredients (recipe_id, ingredient_id, amount, measurement_id)
                VALUES (?,?,?,?)`
    let ingredient_id
    connection.query(sql1, [ingredient], (err, rows) => {
        if(err){
            console.log(err)
            return res.status(500).json({message: "internal server error", err})
        }
        else if(rows.length === 0){
            console.log("Ingredient does not exist.", rows)
            connection.query(sql2, [ingredient], (err2, rows2) => {
                if(err2){
                    console.log(err)
                    return res.status(500).json({message: "internal server error", err2})
                }
                console.log("ingredient created!", rows2)
                ingredient_id = rows2.insertId
                let body = [recipe_id, ingredient_id, amount, measurement_id]

                connection.query(sql3, body, (err, rows) => {
                    if(err){
                        console.log(err)
                        return res.status(500).json("internal server error")
                    }
                    console.log(rows)
                    return res.json({message: "New Recipe Ingredient added", rows})
                })
            })
        }
        else if(rows.length > 0){
            console.log("Ingredient does exist.", rows)
            ingredient_id = rows[0].id
            let body = [recipe_id, ingredient_id, amount, measurement_id]

            connection.query(sql3, body, (err, rows) => {
                if(err){
                    console.log(err)
                    return res.status(500).json("internal server error")
                }
                console.log(rows)
                res.json({message: "New Recipe Ingredient added", rows})
            })
        }
    })
}

module.exports = {itemsSummary, createRecipeIngredient}