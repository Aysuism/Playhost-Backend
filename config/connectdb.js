const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@game-hosting-website-ma.190qs.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTERNAME}`)
        console.log("MongoDB connection is successful!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectdb;