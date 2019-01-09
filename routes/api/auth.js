const express = require("express");
const router = express.Router();

const ValidateRegisterInput = require("../../validation/register");

/**
 * Test route
 */
router.get("/test", (req, res) => {
  res.json({ msg: "This is a test" });
});
/**
 *
 */
router.post("/register", (req, res) => {
  const { errors, isValid } = ValidateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  res.status(201).json({ msg: "Post successful" });
});

module.exports = router;
