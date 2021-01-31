const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Message = require("../Model/Chat");
const User = require("../Model/User");
const Pusher = require("pusher");
const auth = require("../middleware/auth");
const router = express.Router();
const db = mongoose.connection;

const pusher = new Pusher({
    appId: "1131148",
    key: "69bd1e9bd301bdcb9687",
    secret: "1e591175734b519632e0",
    cluster: "ap2",
    useTLS: true,
});
db.once("open", () => {
    const msgCollection = db.collection("messages");
    const changeStream = msgCollection.watch();
    changeStream.on("change", change => {
        console.log(change);
        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                privateid: messageDetails.privateid,
                client: messageDetails.client,
                name: messageDetails.name,
                message: messageDetails.message,
                date: messageDetails.date,
            });
        }
    });
});
router.get("/", auth, async (req, res) => {
    try {
        let message = await Message.find({});
        res.status(200).json(message);
    } catch (error) {
        console.log(error);
    }
});
router.post("/new", auth, async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        let { text, privateid } = req.body;
        if (user) {
            let message = new Message({
                privateid: privateid,
                client: req.user.id,
                name: user.actualName,
                email: user.email,
                message: text,
            });
            await message.save();
            res.status(200).json({ message });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
