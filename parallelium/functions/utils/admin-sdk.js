// Import the firebase library
const firebase = require("firebase-admin");

// This line imports the firebase-admin library
const admin = require("./admin-sdk");

// Initialize the Firebase client library
firebase.initializeApp({
apiKey: "AIzaSyC-c4noPVJzftFmD7T2Z1hFX6oOUsWEebk",
authDomain: "parallelium-804cb.firebaseapp.com",
projectId: "parallelium-804cb"
});

// Create a reference to the Firestore database
const firestore = firebase.firestore();