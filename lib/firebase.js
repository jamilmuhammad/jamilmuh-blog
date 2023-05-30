import { initializeApp } from "firebase/app"
import {
  addDoc,
  collection,
  documentId,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

const db = getFirestore()

export const addBlogAndDocuments = async (collectionToAdd) => {
  const collectionRef = await collection(db, "blogs")
  const addToDoc = await addDoc(collectionRef, collectionToAdd)
}

export const getBlogAndDocument = async (slug) => {
  const collectionRef = collection(db, "blogs")
  const q = query(collectionRef, where(documentId(), "==", slug))

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
}
