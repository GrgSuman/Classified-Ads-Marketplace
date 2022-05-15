const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
  }

  // Generate JWT Refresh
  const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_JWT_SECRET, {
      expiresIn: '1y',
    })
  }

  //verify JWT
  const verifyToken = (token)=>{
    jwt.verify( token, process.env.JWT_SECRET, (err,data)=>{
      if(err){
        const message = err.message === "JsonWebTokenError" ? "invalid token" : err.message
        throw new Error(message)
      }
      return 
    });
  }
  
  
module.exports={
    generateToken,generateRefreshToken,verifyToken
}  