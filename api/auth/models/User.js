const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    }
})

UserSchema.pre('save', async function (next) {
    try {
      if (this.isNew) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
      }
      next()
    } catch (error) {
      next(error)
    }
  })


const User = mongoose.model('User',UserSchema)

module.exports={
    User
}