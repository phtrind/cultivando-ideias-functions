import * as admin from "firebase-admin";

import TranslationService from "../services/translationService";
import Author from "../models/author";
import Content from "../models/content";

export default class AuthorRepository {
  private readonly _firestore: admin.firestore.Firestore;

  constructor(firestore: admin.firestore.Firestore) {
    this._firestore = firestore;
  }

  async getPost(id: string, language: string): Promise<Author> {
    const snapshot = await this._firestore.collection("authors").doc(id).get();
    const name = snapshot.get("name");
    const bioContent = TranslationService.getTranslation(
      language,
      snapshot.get("about")
    );
    const content = new Content(
      bioContent.data,
      bioContent.language,
      snapshot.get("languages")
    );

    return new Author(id, name, content, snapshot.get("image"));
  }
}
