const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: [true, "Please Add a name"],
    },
    email: {
      type: String,
      required: [true, "please add an email"],
      unique: true,
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please add a valid email",
      // ],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "employee",
      enum: ["admin", "employee", "manager", "staff"],
    },
    password: {
      type: String,
      required: [true, "Please Add a password"],
      minLength: 6,
      select: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    resettoken: { type: String },
    expiretoken: { type: Date },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Encrypting our password before saving it into db.
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // this.email = await bcrypt.hash(this.email, salt);
  next();
});
//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  console.log(process.env.JWT_SECRET);
  console.log("process.env.JWT_EXPIRE", process.env.JWT_EXPIRE);
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Match user enetered password to user entered password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", UserSchema);
