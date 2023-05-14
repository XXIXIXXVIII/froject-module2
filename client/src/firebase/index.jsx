import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhqksZ3Ilmgc-B5D17Aj4i9dQzkcKIy-Y",
  authDomain: "projectt4-a5956.firebaseapp.com",
  projectId: "projectt4-a5956",
  storageBucket: "projectt4-a5956.appspot.com",
  messagingSenderId: "938720193722",
  appId: "1:938720193722:web:a7f3ee6e899212f9ab2683",
  measurementId: "G-93L18B2GRN"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)


