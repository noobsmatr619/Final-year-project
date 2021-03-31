const mongoose = require("mongoose");

const config = require("config");
const db = config.get("MongoURL");
//let db = `${process.env.MONGODB_URI}`;
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log("Database connected ....");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
