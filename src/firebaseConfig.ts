import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'API-KEY',
  authDomain: 'mywork-7719c.firebaseapp.com',
  projectId: 'mywork-7719c',
  storageBucket: 'mywork-7719c.appspot.com',
  messagingSenderId: '171535157264',
  appId: '1:171535157264:web:0e9c3718c431eb76c8e295',
  measurementId: 'G-3DT1GCSSEF',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
