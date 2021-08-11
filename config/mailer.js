require("dotenv").config();

var nodemailer = require("nodemailer");
let password = `${process.env.emailPassword}`;
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "soonestecom@gmail.com", // your domain email address
    pass: password, // your password
  },
});

module.exports = transporter;
