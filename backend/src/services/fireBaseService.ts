import admin from "firebase-admin";
import * as serviceAccount from "../../fireBaseKey.json";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://collectionmanager-90e5f.firebaseio.com",
});

export const db = admin.firestore();
