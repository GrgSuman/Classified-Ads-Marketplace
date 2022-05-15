const express = require('express')
const {signupUser,login,aliveToken} = require('../controller/authController.js')
const {verifyUserAuth} = require("../../../middlewares/authMiddleware.js")

const router = express.Router()


router.post("/signup",signupUser)
router.post("/login",login)
router.get("/",verifyUserAuth,(req,res)=>{
    res.json({"msg":"Protected Route is opened now."})
})
router.post("/alive-jwt",aliveToken)

module.exports = router
