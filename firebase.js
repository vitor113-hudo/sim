const { initializeApp } = require("firebase/app");

const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyD8zAl_BgnIniOFlvgLfIR0T73UdgbHQA4",
  authDomain: "cachorrochupetao-28cf2.firebaseapp.com",
  projectId: "cachorrochupetao-28cf2",
  storageBucket: "cachorrochupetao-28cf2.firebasestorage.app",
  messagingSenderId: "98333749668",
  appId: "1:98333749668:web:1427df13470c089a35d131"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

module.exports = db;