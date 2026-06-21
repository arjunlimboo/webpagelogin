import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const form = document.getElementById("registerForm");
const message = document.getElementById("message");
const phoneInput = document.getElementById("phone");

const iti = window.intlTelInput(phoneInput, {
    initialCountry: "in",
    separateDialCode: true,
    preferredCountries: ["in", "us", "gb"]
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const phoneNumber = iti.getNumber();

    if (!fullName || !email || !username || !dateOfBirth || !password) {
        message.style.color = "red";
        message.textContent = "Please fill all fields.";
        return;
    }

    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match!";
        return;
    }

    try {
        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const phoneNumber = iti.getNumber() || phoneInput.value;

            console.log("Phone Number:", phoneNumber);


        await addDoc(collection(db, "users"), {
            uid: userCredential.user.uid,
            fullName,
            email,
            username,
            phone: phoneNumber,
            dateOfBirth,
            createdAt: new Date()
        });

        // Redirect with success message flag
        window.location.href =
            "../login/index.html?registered=true";

    } catch (error) {
        console.error(error);

        message.style.color = "red";

        switch (error.code) {
            case "auth/email-already-in-use":
                message.textContent =
                    "Email already exists.";
                break;

            case "auth/invalid-email":
                message.textContent =
                    "Invalid email address.";   
                break;

            case "auth/weak-password":
                message.textContent =
                    "Password must be at least 6 characters.";
                break;

            default:
                message.textContent =
                    error.message;
        }
    }
});

document.getElementById("loginBtn")
.addEventListener("click", () => {
    window.location.href =
        "../login/index.html";
});