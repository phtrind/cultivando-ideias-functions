import * as admin from "firebase-admin";

import Translation from "../models/translation";
import TranslationService from "../services/translationService";
import Author from "../models/author";

export default class AuthorRepository {
  private readonly _firestore: admin.firestore.Firestore;

  constructor(firestore: admin.firestore.Firestore) {
    this._firestore = firestore;
  }

  async getPost(id: string, language: string): Promise<Author> {
    const snapshot = await this._firestore.collection("authors").doc(id).get();
    const bios = snapshot.get("about") as Translation[];

    return new Author(
      id,
      snapshot.get("author.name"),
      TranslationService.getTranslation(language, bios),
      snapshot.get("image"),
      snapshot.get("languages")
    );
  }
}
