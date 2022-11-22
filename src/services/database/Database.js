import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { API_KEY } from "../../constants/envValues";

export class Database {
  constructor() {
    const firebaseConfig = {
      apiKey: API_KEY,
      authDomain: "todolist-fe0d5.firebaseapp.com",
      projectId: "todolist-fe0d5",
      storageBucket: "todolist-fe0d5.appspot.com",
      messagingSenderId: "318869050343",
      appId: "1:318869050343:web:3596cf952f863e3133a342",
      measurementId: "G-ML9JM8E1FY",
    };

    const app = initializeApp(firebaseConfig);
    this._database = getFirestore(app);
  }

  create(collectionKey, body) {
    const collectionRef = collection(this._database, collectionKey);
    return addDoc(collectionRef, body);
  }

  read(collectionKey) {
    const collectionRef = collection(this._database, collectionKey);
    return getDocs(collectionRef).then((documents) => {
      return documents.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    });
  }

  update(collectionKey, id, body) {
    const document = doc(this._database, collectionKey, id);
    return updateDoc(document, body);
  }

  delete(collectionKey, id) {
    const document = doc(this._database, collectionKey, id);
    return deleteDoc(document);
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}
