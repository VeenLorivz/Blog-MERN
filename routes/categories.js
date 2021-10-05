import Category from "../models/Category.js";
import express from "express";

const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const category = await newCategory.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
