const express = require("express");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Model/User");

const verify = require("../middleware/verify");
const auth = require("../middleware/auth");

const router = express.Router();
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.find({ employee: true }).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Please check all the information is filled" });
    }
});
// Route employee route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User is not registered");
        }

        // if (password !== user.password) {
        //   return res.status(400).json({ msg: "Invalid Credentials" });
        // }
        let isMactch = await bcrypt.compare(password, user.password);
        if (!isMactch) {
            // return res.status(400).json({ msg: "Invalid  password" });
            return res.status(400).send("Password is incorrect");
        }

        payload = {
            user: {
                id: user.id,
                employee: user.employee,
            },
        };
        jwt.sign(
            payload,
            config.get("jwtsecret"),
            {
                expiresIn: "364d",
            },
            (error, token) => {
                if (error) throw error;
                res.json({
                    token,
                });
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).send("Please check all the information is filled");
    }
});
router.post("/addemployee", async (req, res) => {
    let { email, password } = req.body;

    let user;
    try {
        user = await User.findOne({ email: email });
        if (user) {
            return res
                .status(400)
                .json({ msg: "This account already exists with us " });
        }
        // Registring USers
        user = new User({
            email,
            password,
            employee: true,
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({});
    } catch (error) {
        console.error(error);
        return res.status(500).send("Please check all the information is filled");
    }
});
router.get("/", auth, verify.isemployee, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Please check all the information is filled" });
    }
});

module.exports = router;
