const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../Model/User");
const mailer = require("../config/mailer");

const auth = require("../middleware/auth");
const router = express.Router();
//LOAD USER

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Please check all the information is filled" });
  }
});
router.get("/all", auth, async (req, res) => {
  try {
    const user = await User.find({ admin: false }).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Please check all the information is filled" });
  }
});
router.post("/addadmin", async (req, res) => {
  let { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send("This account already exists with us ");
    }
    // Registring USers
    user = new User({
      email,
      password,
      admin: true,
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
//SIGN UP
router.post("/signup", async (req, res) => {
  console.log(req.body);
  let { email, password, actualName } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send("This account already exists with us ");
    }
    // Registring USers

    user = new User({
      email,
      password,
      actualName,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // saving user in database
    await user.save();
    // return jwt token
    payload = {
      user: {
        id: user.id,
        admin: false,
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

router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }
      user.resettoken = token;
      user.expiretoken = Date.now() + 3600000;
      user.save().then(result => {
        mailer.sendMail({
          to: user.email,
          from: 'no-replay@insta.com',
          subject: 'password reset',
          html: `
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="https://dmcerp.herokuapp.com/reset/${token}">link</a> to reset password</h5>
                     `
        });
        res.json({ msg: "check your email" });
      });
    });
  });
});
//Update User Information
router.patch("/update/info", auth, async (req, res) => {
  const { actualName, email } = req.body;
  try {
    let user = await User.findByIdAndUpdate(
      req.user.id,
      {
        actualName: actualName,
        email: email,
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Please check all the information is filled");
  }
});
//resset password reset
router.post("/new-password", (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resettoken: sentToken, expiretoken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" });
      }
      bcrypt.hash(newPassword, 12).then(hashedpassword => {
        user.password = hashedpassword;
        user.resettoken = undefined;
        user.expiretoken = undefined;
        user.save().then(saveduser => {
          res.json({ msg: "password updated success" });
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
});
//LOGIN
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
    if (!user)
      return res.status(400).send("This email is not registered with us .");
    if (user) {
      if (user.admin) {
        return res.status(400).send("This email is not registered with us .");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("User name or password incorrect ");
      }
      payload = {
        user: {
          id: user.id,
          admin: false,
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
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Please check all the information is filled");
  }
});

// DELETE
router.delete("/delete", auth, async (req, res) => {
  try {
    let deletedUser = await User.findOneAndDelete({ email: req.body.email });
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
