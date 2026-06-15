import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBedhkoQ7AOoq7ymbFYLg7GlR_MQXXPWgI",
  authDomain: "finance-tracker-afb4c.firebaseapp.com",
  projectId: "finance-tracker-afb4c",
  storageBucket: "finance-tracker-afb4c.firebasestorage.app",
  messagingSenderId: "909879104349",
  appId: "1:909879104349:web:7623f6efe6cddc7d00ceb4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
