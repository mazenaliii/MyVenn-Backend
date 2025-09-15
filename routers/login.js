const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password").lean();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ errMessage: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: 7 * 24 * 60 * 60 }
    );

    res.status(200).send({
      successMessage: "Logged in successfully. Welcome back!",
      token,
      loggedIn: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ errMessage: "Failed to login user. Server error.", loggedIn: false });
  }
});

module.exports = router;
