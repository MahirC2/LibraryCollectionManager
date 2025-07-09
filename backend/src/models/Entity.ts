import { db } from "../services/firebaseService";

export abstract class Entity {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getAll(): Promise<any[]> {
    const snapshot = await db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getById(id: string): Promise<any | null> {
    const doc = await db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async create(data: any): Promise<string> {
    const docRef = await db.collection(this.collectionName).add(data);
    return docRef.id;
  }

  async update(id: string, data: any): Promise<void> {
    await db.collection(this.collectionName).doc(id).update(data);
  }

  async delete(id: string): Promise<void> {
    await db.collection(this.collectionName).doc(id).delete();
  }
}
