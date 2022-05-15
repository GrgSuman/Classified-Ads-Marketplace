const express = require('express')
const {getAllMainCategories,
        getSingleMainCategory,
        addMainCategory,addTertiaryCategory,
        addSecondaryCategory} = require("../controller/categoryController.js")
        
const {verifyUserAuth} = require("../../../middlewares/authMiddleware.js")

const router = express.Router()

//category routes
router.get("/",getAllMainCategories)
router.get("/:id",getSingleMainCategory)
router.post("/main",addMainCategory)
router.post("/secondary",addSecondaryCategory)
router.post("/tertiary",addTertiaryCategory)


module.exports = router