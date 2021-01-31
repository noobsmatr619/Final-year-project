const express = require("express");
const app = express();
const http = require("http").createServer(app);

const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const db = mongoose.connection;


connectDB();
app.use(cors());
app.use(express.json({ extended: true }));

http.listen(PORT, () => {
    console.log(`Your Server is runing on ${PORT} post `);
});
module.exports = app;