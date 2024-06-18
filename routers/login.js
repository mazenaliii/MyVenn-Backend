const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");
const { decrypt } = require('encrypt-it-mega');


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const decryptedPassword = decrypt(password, process.env.CRYPTING_SECRET);
    const user = await User.findOne({ email }).select("+password").lean();

    if (!user || !(await bcrypt.compare(decryptedPassword, user.password))) {
      return res.send({ errMessage: "Invalid email or password" }).status(401);
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: 7 * 24 * 60 * 60 }
    );

    res
      .send({
        successMessage: "Logged in successfully. Welcome back!",
        token,
        loggedIn: true
      })
      .status(200);
  } catch (error) {
    console.error(error);
    res.send({ errMessage: "Failed to login user. Server error.", loggedIn: false, }).status(500);
  }
});

module.exports = router;