const jwt = require("jsonwebtoken")
const checkJwt = (req, res, next)=>{
    console.log("checking token")
    
    if (!req.headers.authorization){
        return res.status(401).send("You are not authorized")
    }

    let bearer = req.headers.authorization.split(" ")
    let token = bearer[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if (err){
            res.status(401).send("You are not authorized")
        }
        console.log(decoded)
        req.user_id = decoded.user_id
        req.user_name = decoded.user_name
        next()
    })
}
module.exports = checkJwt