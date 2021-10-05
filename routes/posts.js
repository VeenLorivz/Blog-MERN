import Post from "../models/Post.js";
import express from "express";

const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      res.status(401).json("You can only update your post");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("Post Has Been Deleted");
    } else {
      res.status(401).json("You can only Delete your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.username;
  const catName = req.query.category;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [$catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
