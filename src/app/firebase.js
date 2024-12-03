import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWX_ZbVxfoSVF1OHogzQ7twhulaANG2a8",
  authDomain: "aoopfinalproj-a502f.firebaseapp.com",
  projectId: "aoopfinalproj-a502f",
  storageBucket: "aoopfinalproj-a502f.appspot.com",
  messagingSenderId: "384248843551",
  appId: "1:384248843551:web:68b68a4d6279d44ec3f42a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage
const googleAuthProvider = new GoogleAuthProvider();

// Function to handle Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;
    console.log("User Info:", user); // This will contain the user's info including displayName
    // You can now save user info to your state or database if needed
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export { auth, db, storage, googleAuthProvider };