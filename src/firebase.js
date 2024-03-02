import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAvd6GhhgxHjJdMxTSDmUlFCF0d7tu_lNE",
  authDomain: "photo-manager-b3da4.firebaseapp.com",
  projectId: "photo-manager-b3da4",
  storageBucket: "photo-manager-b3da4.appspot.com",
  messagingSenderId: "819296179197",
  appId: "1:819296179197:web:703e9dde83df5eb3c1ff94",
  databaseURL: "https://photo-manager-b3da4-default-rtdb.firebaseio.com/",
};
export const app = initializeApp(firebaseConfig);
