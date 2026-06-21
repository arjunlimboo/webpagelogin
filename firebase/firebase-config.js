import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjnFdThcWEqpmV-4tNgWqEBVqlrnBAj-U",
    authDomain: "webtesting-46ec4.firebaseapp.com",
    projectId: "webtesting-46ec4",
    storageBucket: "webtesting-46ec4.firebasestorage.app",
    messagingSenderId: "137083907740",
    appId: "1:137083907740:web:208ae6cd189f3c56f8c759",
    measurementId: "G-W3H0354Q4G"
};


