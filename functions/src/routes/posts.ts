import * as admin from "firebase-admin";

import Translation from "../models/translation";
import Post from "../models/post";

const firestore = admin.firestore();

const router = require("express").Router();

router.get("/summary/:language", async (req: any, res: any) => {
  const language = req.params.language as string;
  const snapshot = await firestore.collection("posts").get();

  res
    .status(200)
    .json(
      snapshot.docs.map((x) => {
        const titles = x.get("titles") as Translation[];
        const summaries = x.get("summaries") as Translation[];

        return new Post(
          x.id,
          getTranslation(language, titles),
          x.get("author.name"),
          getTranslation(language, summaries),
          x.get("languages"),
          x.get("datetime").toDate()
        );
      })
    )
    .send();
});

router.get("/:id/:language", async (req: any, res: any) => {
  const id = req.params.id as string;
  const language = req.params.language as string;
  const snapshot = await firestore.collection("posts").doc(id).get();
  const titles = snapshot.get("titles") as Translation[];
  const contents = snapshot.get("contents") as Translation[];
  const post: Post = new Post(
    id,
    getTranslation(language, titles),
    snapshot.get("author.name"),
    getTranslation(language, contents),
    snapshot.get("languages"),
    snapshot.get("datetime").toDate()
  );

  res.status(200).json(post).send();
});

const getTranslation = (
  requestedLanguage: string,
  translations: Translation[]
): string => {
  let language = "pt-BR";
  if (requestedLanguage) {
    language = requestedLanguage;
  }
  const translation = translations.filter((x) => x.language === language);
  if (translation && translation.length > 0) {
    return translation[0].data;
  }
  return translation[0].data;
};

module.exports = router;
