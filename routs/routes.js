import express from "express";
import { getPosts, savePosts, deletePost } from "../utils/filehelper.js";

const router = express.Router();

export default () => {
  router.get("/", (req, res) => {
    const proverbs = getPosts();
    res.json({ proverbs });
  });

  router.post("/proverbs", (req, res) => {
    console.log("req.body:", req.body);
    const newProverb = {
      id: req.body.id,
      textDari: req.body.textDari,
      translationEn: req.body.translationEn,
      category: req.body.category,
    };
    const proverbs = getPosts();
    proverbs.push(newProverb);
    savePosts(proverbs);
    res
      .status(201)
      .json({ message: "Proverb added successfully", proverb: newProverb }); // کد 201 برای ایجاد موفق
  });

  router.put("/proverbs/:id", (req, res) => {
    const id = req.params.id;
    const updatedProverb = {
      id: req.body.id,
      textDari: req.body.textDari,
      translationEn: req.body.translationEn,
      category: req.body.category,
    };
    let proverbs = getPosts();
    const index = proverbs.findIndex((proverb) => proverb.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Proverb not found" }); // کد 404 برای یافت نشدن
    }

    proverbs[index] = updatedProverb;
    savePosts(proverbs);
    res.json({
      message: "Proverb updated successfully",
      proverb: updatedProverb,
    });
  });

  router.delete("/proverbs/:id", (req, res) => {
    const id = req.params.id;
    let proverbs = getPosts();
    const initialLength = proverbs.length;
    proverbs = proverbs.filter((proverb) => proverb.id !== id);
    if (proverbs.length === initialLength) {
      return res.status(404).json({ message: "Proverb not found" });
    }
    savePosts(proverbs);
    res.json({ message: "Proverb deleted successfully" });
  });
  return router;
};
