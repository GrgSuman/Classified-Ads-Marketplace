const express = require('express');
require('dotenv').config();
const logger = require('morgan');
const connectDB = require('./config/connectDB.js')
//connecting DB
connectDB()
const {errorHandler} = require('./middlewares/errorHandler.js')

//importing routes
const authRoutes = require('./api/auth/routes/authRoutes.js')
const categoryRoutes = require("./api/niche/routes/categoryRoute.js")


const app = express();
app.use(logger('dev'));

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//implementing routes
//auth
app.use('/api/user',authRoutes)

//category
app.use('/api/category',categoryRoutes)

//error 404
app.use("/*",(req,res)=>{
    res.json({"msg":"Muji Invalid Link"})
})

app.use(errorHandler)

const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
