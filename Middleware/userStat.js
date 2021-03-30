const User = require("../Model/User");

module.exports = {
  isAdmin: async (req, res, next) => {
    verifyUser = await User.findById(req.user.id);
    if (verifyUser.admin) {
      next();
    } else {
      console.log(verifyUser);
      res.status(403).json({ msg: "You are not an Administrator" });
    }
  },
};