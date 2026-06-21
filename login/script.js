import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyBjnFdThcWEqpmV-4tNgWqEBVqlrnBAj-U",
    authDomain: "webtesting-46ec4.firebaseapp.com",
    projectId: "webtesting-46ec4",
    storageBucket: "webtesting-46ec4.firebasestorage.app",
    messagingSenderId: "137083907740",
    appId: "1:137083907740:web:208ae6cd189f3c56f8c759",
    measurementId: "G-W3H0354Q4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
            console.log("LOGIN SUCCESSFUL");
        // Redirect after login
        window.location.href = "../dashboard/dashboard.html";

    } catch (error) {

        switch (error.code) {

            case "auth/invalid-credential":
                alert("Invalid email or password");
                break;

            case "auth/user-not-found":
                alert("User not found");
                break;

            case "auth/wrong-password":
                alert("Wrong password");
                break;

            default:
                alert(error.message);
        }
    }
});

document.getElementById("registerBtn")
.addEventListener("click", () => {
    window.location.href = "../register/index.html";
});