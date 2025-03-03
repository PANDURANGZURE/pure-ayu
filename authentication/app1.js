import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } 
from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCHl7WO9TmbCLSkLuwy86J_rxLGV0pqdBE",
    authDomain: "pure-aayu.firebaseapp.com",
    projectId: "pure-aayu",
    storageBucket: "pure-aayu.appspot.com",
    messagingSenderId: "1098160312691",
    appId: "1:1098160312691:web:e8d7aac7f092c3f924b506",
    measurementId: "G-9RVJSGQ6KM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const logoutBtn = document.getElementById("logout-btn");
const forgotPasswordLink = document.getElementById("forgot-password");

// Login User
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
        window.location.href = "../index.html";
    } catch (error) {
        alert(error.message);
    }
});

// Register User
registerBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
        window.location.href = "../index.html";
    } catch (error) {
        alert(error.message);
    }
});

// Logout User
logoutBtn.addEventListener("click", async () => {
    try {
        await signOut(auth);
        alert("Logged out!");
    } catch (error) {
        alert(error.message);
    }
});

// Forgot Password
forgotPasswordLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    if (!email) {
        alert("Please enter your email address.");
        return;
    }
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent!");
    } catch (error) {
        alert(error.message);
    }
});

// Check Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        loginBtn.classList.add("hidden");
        registerBtn.classList.add("hidden");
        logoutBtn.classList.remove("hidden");
    } else {
        loginBtn.classList.remove("hidden");
        registerBtn.classList.remove("hidden");
        logoutBtn.classList.add("hidden");
    }
});