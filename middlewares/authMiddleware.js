const jwt = require("jsonwebtoken");
const {verifyToken} = require("../utils/jwtHelper.js")

const verifyUserAuth = (req,res,next)=>{
    if (!req.headers['authorization']){
        res.status(401)
        throw new Error("Unauthorized Access")
    } else{
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        verifyToken(token)
        next()
    }
}

module.exports={
    verifyUserAuth
}