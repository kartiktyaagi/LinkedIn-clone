import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDV6xvnyfReviwRz4XXQsNe6w2qrqxKPO0",
  authDomain: "linkedin-clone-6daa7.firebaseapp.com",
  projectId: "linkedin-clone-6daa7",
  storageBucket: "linkedin-clone-6daa7.appspot.com",
  messagingSenderId: "183409012055",
  appId: "1:183409012055:web:1622c72472b81be403a212",
  measurementId: "G-5901RZPG6Q",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
