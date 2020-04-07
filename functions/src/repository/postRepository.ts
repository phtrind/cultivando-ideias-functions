import * as admin from "firebase-admin";

import PostSummary from "../models/postSummary";
import Translation from "../models/translation";
import Post from "../models/post";
import TranslationService from "../services/translationService";
import AuthorRepository from "./authorRepository";

export default class PostRepository {
  private readonly _firestore: admin.firestore.Firestore;

  constructor(firestore: admin.firestore.Firestore) {
    this._firestore = firestore;
  }

  async getSummaries(language: string): Promise<PostSummary[]> {
    const snapshot = await this._firestore.collection("posts").get();
    return snapshot.docs.map((x) => {
      const titles = x.get("titles") as Translation[];
      const summaries = x.get("summaries") as Translation[];

      return new PostSummary(
        x.id,
        TranslationService.getTranslation(language, titles),
        x.get("author.name"),
        TranslationService.getTranslation(language, summaries),
        x.get("languages"),
        x.get("datetime").toDate()
      );
    });
  }

  async getPost(id: string, language: string): Promise<Post> {
    const snapshot = await this._firestore.collection("posts").doc(id).get();
    const titles = snapshot.get("titles") as Translation[];
    const contents = snapshot.get("contents") as Translation[];
    const authorId = snapshot.get("author.id");
    const author = await new AuthorRepository(this._firestore).getPost(
      authorId,
      language
    );

    return new Post(
      id,
      TranslationService.getTranslation(language, titles),
      author,
      TranslationService.getTranslation(language, contents),
      snapshot.get("languages"),
      snapshot.get("datetime").toDate()
    );
  }
}
