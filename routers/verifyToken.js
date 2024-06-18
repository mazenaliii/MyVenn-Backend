const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post('/verify-token', (req, res) => {
  const { token } = req.body;
  try {
    if(token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        decoded && res.send({ isValid: true, userId: req.user.userId },).status(200);
    }  else {
        
    }
  } catch (error) {
    res.json({ isValid: false }).status(401)
    console.log(error, 'Unauthorized')
  }
});

module.exports = router