import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCbhk1M1g82_Qp9HNhxMi9BaNaWyLX6Btc",
  authDomain: "forks-17b77.firebaseapp.com",
  databaseURL: "https://forks-17b77.firebaseio.com",
  projectId: "forks-17b77",
  storageBucket: "forks-17b77.appspot.com",
  messagingSenderId: "540371952470",
  appId: "1:540371952470:web:2250ed373add2a63e8acf7"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
