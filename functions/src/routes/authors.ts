import AuthorRepository from "../repository/authorRepository";
import admin = require("firebase-admin");

const router = require("express").Router();

const firestore = admin.firestore();

router.get("/combo", async (_: any, res: any) => {
  const repository = new AuthorRepository(firestore);
  repository
    .getAuthorsCombo()
    .then((combo) => {
      res.status(200).json(combo).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send();
    });
});

module.exports = router;
