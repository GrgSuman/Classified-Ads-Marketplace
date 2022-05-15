const { type } = require("express/lib/response")
const mongoose = require("mongoose")

const AdPost = mongoose.Schema({

    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    images:[
        {
            type:String,
            required:false,
            default:""
        }
    ],
    category:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TertiaryCategoryModel",
    }
   ]
}, { timestamps: true }
)

const AdPostModel = mongoose.Model("AdPostModel",AdPost)

module.exports = AdPost