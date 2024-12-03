// Import the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
//for email/pass authentication
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG67UvxJWaOQOyPBZ3LTDVEbGdFDgcs1Y",
  authDomain: "cram-53e28.firebaseapp.com",
  projectId: "cram-53e28",
  storageBucket: "cram-53e28.appspot.com",
  messagingSenderId: "364526124240",
  appId: "1:364526124240:web:1e3e2534974e47b93672d5",
  measurementId: "G-D4YD4XY3SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized");

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Signup function
export const signUp = async (email, password) => {
    console.log("SignUp function called"); // Debug: Check if this is logged
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log("User created:", user); // Debug: Check if the user object is logged
      console.log("Attempting to add user to Firestore...");
  
      // Add the user to Firestore under the "Users" collection
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        name: "Default Name", // Placeholder until you add name input
      });
  
      console.log("User added to Firestore successfully");
    } catch (error) {
      console.error("Error signing up:", error.message); // Debug: Log any errors
    }
  };
  

// Login function
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user; // Return the user for further use if needed
  } catch (error) {
    throw new Error(error.message); // Throw error for handling in component
  }
};

//sign up function
export const createUser = async (email, password, additionalData) => {
  const auth = getAuth();
  const db = getDatabase();

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Store additional data in Firebase Realtime Database
  await set(ref(db, `users/${user.uid}`), {
    email: user.email,
    ...additionalData,
  });
};
