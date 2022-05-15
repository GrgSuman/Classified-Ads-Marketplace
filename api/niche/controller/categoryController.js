const asyncHandler = require("express-async-handler")

const {MainCategoryModel,SecondaryCategoryModel,TertiaryCategoryModel} = require("../model/categoryModel.js")

//@access public
//@desc get all main category
//@ GET /api/category
const getAllMainCategories = async (req,res)=>{

    try{
        const allCategories = await MainCategoryModel.find({}).populate({
            path:"categorySecondary",
            populate:{
                path:"categoryTertiary"
            }
        })
        res.json({
            "msg":"success",
            "data":allCategories
        })
 
    }
    catch(e){
        next(e)
    }
}

//@access public
//@desc get single category
//@ GET /api/category/:id
const getSingleMainCategory = (req,res)=>{
    res.json({"msg":"success","data":"Single Category"})
}


//@access private
//@desc add single category
//@ POST /api/category/main
const addMainCategory = async (req,res,next)=>{
    const{categoryName,categoryThumbnial,isCategoryActive,seoTags,categorySecondary} = req.body;
    if(!categoryName || !categorySecondary){
        res.status(500).json({
            "msg":"Categoryname is required"
        })
    }
    else{
        try{
            const category = new MainCategoryModel({
                categoryName,categoryThumbnial,isCategoryActive,seoTags,categorySecondary
            })
            const mCategory = await category.save()
           
                res.status(201).json({
                    "msg":"success",
                    "data":mCategory
                })
        }
        catch(e){
            console.log(e)
            if(e.code===11000){
                const err = new Error("Category already exists")
                res.status(409)
                next(err)
            }
            else{
                res.status(500).json({"msg":"internal server error"})
            }
        }
    }
}

//@access private
//@desc add single category
//@ POST /api/category/secondary
const addSecondaryCategory = async (req,res,next)=>{
    const{categoryName,categoryThumbnial,isCategoryActive,seoTags,categoryTertiary} = req.body;
    if(!categoryName || !categoryTertiary){
        res.status(500).json({
            "msg":"all fields are required"
        })
    }
    
   else{

    try{
        const category = new SecondaryCategoryModel({
            categoryName,categoryThumbnial,isCategoryActive,seoTags,categoryTertiary
        })
        const sCategory = await category.save()
            res.status(201).json({
                "msg":"success",
                "data":sCategory
            })
    }
    catch(e){
        console.log(e.type)
        if(e.code===11000){
            const err = new Error("Category already exists")
            res.status(409)
            next(err)
        }
        else{
            res.status(500).json({"msg":"internal server error"})
        }
    }
   }   
}

//@access private
//@desc add single category
//@ POST /api/category/tertiary
const addTertiaryCategory = async (req,res,next)=>{
    const{categoryName,categoryThumbnial,isCategoryActive,seoTags,categorySecondary} = req.body;
    if(!categoryName){
        res.status(500).json({
            "msg":"Categoryname is required"
        })
    }
    else{
        try{
            const category = new TertiaryCategoryModel({
                categoryName,categoryThumbnial,isCategoryActive,seoTags,categorySecondary
            })
            const tCategory = await category.save()
           
                res.status(201).json({
                    "msg":"success",
                    "data":tCategory
                })
           
        }
        catch(e){
            console.log(e)
            if(e.code===11000){
                const err = new Error("Category already exists")
                res.status(409)
                next(err)
            }
            else
            res.status(500).json({"msg":"internal server error"})
        }
    }
}

module.exports={
    getAllMainCategories,
    getSingleMainCategory,
    addMainCategory,
    addSecondaryCategory,
    addTertiaryCategory
}