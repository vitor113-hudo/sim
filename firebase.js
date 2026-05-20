const { initializeApp } = require("firebase/app");

const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDpeUdaomZu9SPqg01n__dGiggwRB4cEM0",
  authDomain: "app-mongo-f624a.firebaseapp.com",
  projectId: "app-mongo-f624a",
  storageBucket: "app-mongo-f624a.firebasestorage.app",
  messagingSenderId: "1057897713045",
  appId: "1:1057897713045:web:f1ae59f3b877355336fa9c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

module.exports = db;