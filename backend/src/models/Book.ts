import { Entity } from "./Entity";
import { db } from "../services/firebaseService";

export class Book extends Entity {
  constructor() {
    super("Books");
  }

  async findByGenre(genre: string): Promise<any[]> {
    const snapshot = await db
      .collection(this.collectionName)
      .where("Genre", "==", genre)
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}
