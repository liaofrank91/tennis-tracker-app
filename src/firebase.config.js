import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZKSRLdfELKzOXr39z3ToNd4LK-smEy30",
  authDomain: "tennis-app-7d67b.firebaseapp.com",
  projectId: "tennis-app-7d67b",
  storageBucket: "tennis-app-7d67b.appspot.com",
  messagingSenderId: "911261227860",
  appId: "1:911261227860:web:5644d0ebd398054ec046c1"
}

// Initialize Firebase
initializeApp(firebaseConfig); 
export const db = getFirestore()