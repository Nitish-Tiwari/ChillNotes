const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
const URL = process.env.DATABASE_URL
const mongoURI = URL;

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connect to Mongo Server Successfully")
    })
}

module.exports = connectToMongo;