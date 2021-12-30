import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTOb-HclL80NWFRDFS_8quA7M_nErWvZY",
  authDomain: "glints-d9775.firebaseapp.com",
  projectId: "glints-d9775",
  storageBucket: "glints-d9775.appspot.com",
  messagingSenderId: "898672918276",
  appId: "1:898672918276:web:1609aeff8cb1f3f8185a51",
  measurementId: "G-9QFFQT7YEF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
