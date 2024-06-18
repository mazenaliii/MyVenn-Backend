const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/checkemail", async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
      .send({ errMessage: "Email is used before, please try another one." })
    } else {
        return res
        .send({ successMessage: "Email is not used before." })
    }
  } catch (error) {
    console.error("Error checking email", error);
    res
      .status(500)
      .send({
        errMessage: "Failed to check email.",
      });
  }
});

module.exports = router;
