const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI
    const DB_OPTIONS = {
        dbName: "market"
    }
    const conn = await mongoose.connect(MONGO_URI,DB_OPTIONS)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB