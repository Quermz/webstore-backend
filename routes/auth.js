const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Wrong credentials");
    }
    const unhashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS
    ).toString(CryptoJS.enc.Utf8);

    if (unhashedPassword !== req.body.password) {
      res.status(401).json("Wrong Password");
    } else {
      delete user._doc.password;
      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT,
        { expiresIn: "3d" }
      );
      res.status(200).json({ user, accessToken });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
