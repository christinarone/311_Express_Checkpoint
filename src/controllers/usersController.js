const { connect } = require("../model/db");
let db = require("../model/db");
const connection = require("../model/db");
const bcrypt = require('bcrypt');
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("jsonwebtoken")
const mysql = require("mysql")

// function to return a summary of the items on the response
const signUp = (req, res) => {
    console.log('sign up user')
    let user_name = req.body.user_name;
    let password = req.body.password;
    let sql = "INSERT INTO users (user_name, password) VALUES(?, ?);";
    bcrypt.hash(password, 10, (error, hash) => {
        if (error) console.log(error)
        // Store hash in your password DB.
        console.log(hash)
        let params = [user_name, hash];
        db.query(sql, params, (err, results) => {
            res.json(results)
        });
    });
}

const login = async (req, res) => {
    // get user input from the body
    let user_name = req.body.user_name;
    let password = req.body.password;
    // SELECT query and bring back data that matches the user_name
    let sql = "select * FROM users where user_name = ?"
    sql = mysql.format(sql, [user_name, password])
    db.query(sql, async (err, results) => {
        console.log("results", results)
        if (err) {
            console.log("could not log in", err);
            res.sendStatus(500);
            return; //use return so that you do not need to write an else statement
        };

        if (results.length > 1) {// if there were more than 1 email that showed up, then that is an error
            console.log("there is more than 1 log in for ", email);
            res.sendStatus(500);
            return;
        }; // there is an error because there is more than one of these emails in our database

        if (results.length == 0) {
            console.log("testtesttest")
            res.sendStatus(400);
            return;
        }; // if there is not a result for this email, that means that the email login was not created 

        let hash = await bcrypt.hash(results[0].password, 10); //we need to get the hash from the database
        console.log("hash", hash)
        bcrypt.compare(password, hash, (err2, results2) => {
            console.log(results2)
            console.log("results", results[0].id)
            if (results2) {
                let token = {
                    user_name: user_name,
                    user_id: results[0].id
                };
                let signedToken = jwt.sign(token, process.env.JWT_SECRET)
                res.status(200).json({ userid: results[0].id, token: signedToken });
                //if the password is good or the correct password, then we will respond with this token 
            } else {
                console.log("error")
                res.status(400).json({ error: err2, message: "The username/password is incorrect." }); // it is 400 because the client made the mistake; they sent the wrong email/password combo
            }
        });
        //code above is directly from the BCRYPT documentation!


    })


}

module.exports = { signUp, login }