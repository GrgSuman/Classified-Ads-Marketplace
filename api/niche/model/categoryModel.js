const mongoose = require("mongoose")

const mainCategory = mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    categoryThumbnial:{
        type:String,
    },
    isCategoryActive:{
        type:Boolean,
        default:true
    },
    seoTags:{
        keywords:[String],
        description:String,
        title:String
    }, 
    categorySecondary:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "SecondaryCategoryModel",
        unique:true,
        required:true
    }]
})

const secondaryCategory = mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    categoryThumbnial:{
        type:String,
    },
    isCategoryActive:{
        type:Boolean,
        default:true
    },
    seoTags:{
        keywords:[String],
        description:String,
        title:String
    },
    categoryTertiary:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "TertiaryCategoryModel",
        unique:true,
        required:true
    }]
})

const tertiaryCategory = mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    categoryThumbnial:{
        type:String,
    },
    isCategoryActive:{
        type:Boolean,
        default:true
    },
    seoTags:{
        keywords:[String],
        description:String,
        title:String
    },
})

const MainCategoryModel = mongoose.model("MainCategoryModel",mainCategory)
const SecondaryCategoryModel = mongoose.model("SecondaryCategoryModel",secondaryCategory)
const TertiaryCategoryModel = mongoose.model("TertiaryCategoryModel",tertiaryCategory)

module.exports={
    MainCategoryModel,
    SecondaryCategoryModel,
    TertiaryCategoryModel
}