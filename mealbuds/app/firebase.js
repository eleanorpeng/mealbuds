import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaM4ZMtwijYFenx5amCDo-SyJewXaT2Yk",
  authDomain: "cs278mealbudge.firebaseapp.com",
  projectId: "cs278mealbudge",
  storageBucket: "cs278mealbudge.appspot.com",
  messagingSenderId: "641438036615",
  appId: "1:641438036615:ios:ae4ea9ea4f11a3d6a53e22",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
