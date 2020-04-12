import * as admin from "firebase-admin";

import PostSummary from "../models/postSummary";
import Translation from "../models/translation";
import Post from "../models/post";
import TranslationService from "../services/translationService";
import AuthorRepository from "./authorRepository";
import Content from "../models/content";
import NewPost from "../models/newPost";

export default class PostRepository {
  private readonly _firestore: admin.firestore.Firestore;

  constructor(firestore: admin.firestore.Firestore) {
    this._firestore = firestore;
  }

  async getSummaries(language: string): Promise<PostSummary[]> {
    const snapshot = await this._firestore.collection("posts").get();
    return snapshot.docs.map((x) => {
      const titles = x.get("titles") as Translation[];
      const postSummary: PostSummary = {
        id: x.id,
        title: TranslationService.getTranslation(language, titles).data,
        author: x.get("author.name"),
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
    const author = await new AuthorRepository(this._firestore).getAuthor(
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

  async newPost(newPost: NewPost): Promise<string> {
    const authorName = await new AuthorRepository(
      this._firestore
    ).getAuthorName(newPost.author);
    const author = {
      id: newPost.author,
      name: authorName,
    };
    const datetime = admin.firestore.Timestamp.now();
    const languages: string[] = [];
    const titles: Translation[] = [];
    const contents: Translation[] = [];
    const likes = 0;
    const image = "";
    newPost.contents.forEach((x) => {
      languages.push(x.language);
      titles.push({
        data: x.title ?? "",
        language: x.language,
      });
      contents.push({
        data: x.data,
        language: x.language,
      });
    });
    const post = {
      author,
      datetime,
      languages,
      titles,
      contents,
      likes,
      image,
    };
    const saved = await this._firestore.collection("posts").add(post);
    return saved.id;
  }
}
