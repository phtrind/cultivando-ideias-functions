import * as admin from "firebase-admin";

import PostSummary from "../models/postSummary";
import Translation from "../models/translation";
import Post from "../models/post";
import TranslationService from "../services/translationService";
import AuthorRepository from "./authorRepository";
import Content from "../models/content";

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
        TranslationService.getTranslation(language, titles).data,
        x.get("author.name"),
        TranslationService.getTranslation(language, summaries).data,
        x.get("languages"),
        x.get("datetime").toDate()
      );
    });
  }

  async getPost(id: string, language: string): Promise<Post> {
    const snapshot = await this._firestore.collection("posts").doc(id).get();
    const title = TranslationService.getTranslation(
      language,
      snapshot.get("titles")
    );
    const postContent = TranslationService.getTranslation(
      language,
      snapshot.get("contents")
    );
    const author = await new AuthorRepository(this._firestore).getPost(
      snapshot.get("author.id"),
      language
    );
    const content = new Content(
      postContent.data,
      postContent.language,
      snapshot.get("languages"),
      title.data
    );
    return new Post(id, author, content, snapshot.get("datetime").toDate());
  }
}
