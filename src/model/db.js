let mysql = require("mysql");
//establishing a connection to my RDS (relational database service) server; using the mySQL npm package
//this is adding the credentials to mySQL & saving it to a variable called, connection.
console.log(process.env.DB_HOST)
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
});
// this establishes the connection
connection.connect();
// this tests the connection
connection.query("select now()", function(err, results){
if(err){
    console.log("Could not test the database connection", err);
} else {
    console.log("Connection test results: ", results);
}
})
// this exports the connection instance
module.exports = connection;