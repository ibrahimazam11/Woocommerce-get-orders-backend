//Set up mongoose connection
require('dotenv').config()
const mongoose = require('mongoose');
const mongoDB = process.env.DATABASE_URL

module.exports = {
    createMongoose() {
        mongoose.connect(mongoDB, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log(`Connected to MongoDB at: ${new Date()}`);
        });
    }
}