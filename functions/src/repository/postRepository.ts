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
      const postSummary: PostSummary = {
        id: x.id,
        title: TranslationService.getTranslation(language, titles).data,
        author: x.get("author.name"),
        content: TranslationService.getTranslation(language, summaries).data,
        languages: x.get("languages"),
        datetime: x.get("datetime").toDate(),
      };

      return postSummary;
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
    const content: Content = {
      data: postContent.data,
      language: postContent.language,
      availableLanguages: snapshot.get("languages"),
      title: title.data,
    };
    const post: Post = {
      id: id,
      author: author,
      content: content,
      datetime: snapshot.get("datetime").toDate(),
    };

    return post;
  }
}
