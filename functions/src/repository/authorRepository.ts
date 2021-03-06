import * as admin from "firebase-admin";

import TranslationService from "../services/translationService";
import Author from "../models/author";
import Content from "../models/content";
import KeyValue from "../models/keyValue";

export default class AuthorRepository {
  private readonly _firestore: admin.firestore.Firestore;

  constructor(firestore: admin.firestore.Firestore) {
    this._firestore = firestore;
  }

  async getAuthorsCombo(): Promise<KeyValue[]> {
    const snapshot = await this._firestore
      .collection("authors")
      .orderBy("name", "asc")
      .get();
    return snapshot.docs.map((x) => {
      return {
        key: x.id,
        value: x.get("name"),
      };
    });
  }

  async getAuthor(id: string, language: string): Promise<Author> {
    const snapshot = await this._firestore.collection("authors").doc(id).get();
    const name = snapshot.get("name");
    const bioContent = TranslationService.getTranslation(
      language,
      snapshot.get("about")
    );
    const content: Content = {
      data: bioContent.data,
      language: bioContent.language,
      availableLanguages: snapshot.get("languages"),
    };
    const author: Author = {
      id: id,
      name: name,
      bio: content,
      image: snapshot.get("image"),
    };

    return author;
  }

  async getAuthorName(id: string): Promise<string> {
    const snapshot = await this._firestore.collection("authors").doc(id).get();
    return snapshot.get("name");
  }
}
