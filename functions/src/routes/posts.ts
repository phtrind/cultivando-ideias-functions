import PostRepository from "../repository/postRepository";
import admin = require("firebase-admin");

const router = require("express").Router();

const firestore = admin.firestore();

router.get("/summary/:language", async (req: any, res: any) => {
  const language = req.params.language as string;
  const summaries = await new PostRepository(firestore).getSummaries(language);
  res.status(200).json(summaries).send();
});

router.get("/:id/:language", async (req: any, res: any) => {
  const id = req.params.id as string;
  const language = req.params.language as string;
  const post = await new PostRepository(firestore).getPost(id, language);
  res.status(200).json(post).send();
});

module.exports = router;
