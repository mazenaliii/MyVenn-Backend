const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();

router.post('/register', async (req, res) => {
  let success = false;
  const { email, password, name, dob, country, gender, jobTitle, companyName, industry, profilePicture } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ errMessage: "The user with this email already registered before.", success });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword, name, dob, country, gender, jobTitle, companyName, industry, profilePicture });
    await newUser.save();
    success = true;
    res.status(200).json({ successMessage: "Account created. Welcome to MyVenn!", success });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ errMessage: "Failed to create user, please try again later.", success });
  }
});

module.exports = router
