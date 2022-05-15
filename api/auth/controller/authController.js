const bcrypt = require("bcryptjs");
const { User } = require("../models/User.js");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const {generateToken,generateRefreshToken,verifyRefreshToken} = require("../../../utils/jwtHelper.js")


//@desc Signup route
//@POST api/user
//@access public 
const signupUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ fullName, email, password });
  
  res.status(201)
  res.json({"message":"success",user})

});

//@desc Login route
//@POST api/user/login
//@access public 
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("email and password are required");
  }
  // Check if user exists
  const user = await User.findOne({ email });

  if (user&&(await bcrypt.compare(password, user.password))) {
    res.json({
      "message":"success",
      "user":user.fullName,
      "email":user.email,
      "token":generateToken(user._id),
      "refresh_token":generateRefreshToken(user._id)
    })  
  }
  else{
      res.status(400)
      throw new Error("Invalid Credentials")
  }
});


  // Generate Alive JWT and Refresh 
  const aliveToken = (req,res) => {
  const id=5
  const refresh_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2I5NDcxZjQ2YzU0YjQyZmZiOTQ5YiIsImlhdCI6MTY1MjM0OTIwMCwiZXhwIjoxNjgzOTA2ODAwfQ.EYz76OReZL4Azhc4Lyqz5urWH6JTUo1aWXl8BeDmW_w"
  if (!req.headers['authorization']){
    res.status(401)
    throw new Error("Unauthorized Access")
  } else{
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]

    const isJWTExpired = jwt.verify( token, process.env.JWT_SECRET, (err,data)=>{
        if(err?.message ==="jwt expired"){
            return true
        }else{
          return false
        }
    })

    const isRefreshTokenValid = jwt.verify( refresh_token, process.env.REFRESH_JWT_SECRET, (err,data)=>{
      if(err){
          return false
      }else{
        return true
      }
  })

    if(isJWTExpired && isRefreshTokenValid){
      res.json({
              "token":generateToken(id),
              refresh_token
          })
    }else{
      res.status(401)
      throw new Error("Unauthorized Access")
    }
  }
}
  
module.exports = {
  signupUser,
  login,
  aliveToken
};
