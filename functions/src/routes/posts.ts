import PostRepository from "../repository/postRepository";
import admin = require("firebase-admin");
import NewPost from "../models/newPost";

const router = require("express").Router();

const firestore = admin.firestore();

router.get("/summary/:language", async (req: any, res: any) => {
  const language = req.params.language as string;
  const repository = new PostRepository(firestore);
  repository
    .getSummaries(language)
    .then((summary) => {
      res.status(200).json(summary).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});

router.get("/:id/:language", async (req: any, res: any) => {
  const id = req.params.id as string;
  const language = req.params.language as string;
  const repository = new PostRepository(firestore);
  repository
    .getPost(id, language)
    .then((post) => {
      res.status(200).json(post).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});

router.post("/", async (req: any, res: any) => {
  const newPost = req.body as NewPost;
  const repository = new PostRepository(firestore);
  repository
    .newPost(newPost)
    .then((id) => {
      res.status(200).json(id).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});

module.exports = router;
