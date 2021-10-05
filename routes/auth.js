import express from "express";
import User from "../models/User.js";
const router = express.Router();
import bcrypt, { compare } from "bcrypt";

// REGISTER
router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profilePic: req.body.profilePic,
    });
    const user = await newUser.save();
    const { password, ...others } = user._doc;
    res.status(201).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("Account Not Found !");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(404).json("Account Not Found !");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
