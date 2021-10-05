import User from "../models/User.js";
import Post from "../models/Post.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

// UPDATE
router.put("/:id", async (req, res) => {
  if (req.params.id === req.body.userId) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...others } = updatedUser._doc;
      res.status(200).json(others);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    res.status(401).json("you can only update your account");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.params.id === req.body.userId) {
    try {
      const user = await User.findById(req.params.id);

      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Has Been Deleted");
      } catch (error) {
        res.status(500).json(error.message);
      }
    } catch (error) {
      res.status(404).json("User Not Found");
    }
  } else {
    res.status(401).json("you can only delete your account");
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
