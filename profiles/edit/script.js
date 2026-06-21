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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let documentId = "";

// Load User Data
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

            documentId = userDoc.id;

            const data = userDoc.data();

            document.getElementById("fullName").value =
                data.fullName || "";

            document.getElementById("username").value =
                data.username || "";

            document.getElementById("phone").value =
                data.phone || "";

            document.getElementById("dob").value =
                data.dateOfBirth || "";
        });

    } catch (error) {
        console.error(error);
    }

});

// Save Changes
document.getElementById("saveBtn")
.addEventListener("click", async () => {

    if (!documentId) {
        alert("User document not found.");
        return;
    }

    try {

        await updateDoc(
            doc(db, "users", documentId),
            {
                fullName:
                    document.getElementById("fullName").value.trim(),

                username:
                    document.getElementById("username").value.trim(),

                phone:
                    document.getElementById("phone").value.trim(),

                dateOfBirth:
                    document.getElementById("dob").value
            }
        );

        // Redirect to Profile Page
        window.location.href = "../profiles/index.html";

    } catch (error) {

        console.error(error);
        alert("Failed to update profile.");

    }

});