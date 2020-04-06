import * as admin from "firebase-admin";

import PostSummary from "../models/post_summary";
import Translation from "../models/translation";

const firestore = admin.firestore();

const router = require("express").Router();

router.get("/summary", async (req: any, res: any) => {
  const language = req.body.language as string;
  const snapshot = await firestore.collection("posts").get();

  res
    .status(200)
    .json(
      snapshot.docs.map((x) => {
        const titles = x.get("titles") as Translation[];
        const summaries = x.get("summaries") as Translation[];

        return new PostSummary(
          x.id,
          getTranslation(language, titles),
          x.get("author.name"),
          getTranslation(language, summaries),
          x.get("datetime").toDate()
        );
      })
    )
    .send();
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
