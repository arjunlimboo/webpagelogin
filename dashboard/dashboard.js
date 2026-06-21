import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    query,
    where,
    getDocs
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Show Today's Date
document.getElementById("todayDate").textContent =
    new Date().toDateString();

// Check Login State
onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "../login/index.html";
        return;
    }

    try {

        const q = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((userDoc) => {

            const data = userDoc.data();

            document.getElementById("fullName").textContent =
                data.fullName || "N/A";

            document.getElementById("email").textContent =
                data.email || "N/A";

            document.getElementById("phone").textContent =
                data.phone || "N/A";

            document.getElementById("dob").textContent =
                data.dateOfBirth || "N/A";
        });

    } catch (error) {
        console.error("Error fetching user data:", error);
    }
});

// Edit Profile
document.getElementById("editBtn")
.addEventListener("click", () => {

    window.location.href =
        "../profiles/edit/index.html";
});

// View Profile
document.getElementById("profileBtn")
.addEventListener("click", () => {

    window.location.href =
        "../profiles/index.html";
});

// Logout
document.getElementById("logoutBtn")
.addEventListener("click", async () => {

    try {

        await signOut(auth);

        window.location.href =
            "../login/index.html";

    } catch (error) {

        console.error("Logout Error:", error);

        alert("Failed to logout.");
    }
});