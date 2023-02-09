// Import the Firebase library
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

//  Parallelium Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-c4noPVJzftFmD7T2Z1hFX6oOUsWEebk",
  authDomain: "parallelium-804cb.firebaseapp.com",
  databaseURL: "https://parallelium-804cb.firebaseio.com/",
  projectId: "parallelium-804cb",
  storageBucket: "parallelium-804cb.appspot.com",
  messagingSenderId: "210522213244",
  appId: "1:210522213244:web:7ada3df906d52e317072f9",
  measurementId: "341434579"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Auth and Firestore services
const auth = firebase.auth();
const firestore = firebase.firestore();
firebase.firestore().enablePersistence()
.then(function() {
console.log("Firestore persistence enabled");
})
.catch(function(err) {
console.log("Firestore persistence failed: ", err);
});

// CREATE REVIEW
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Basic validation to make sure that the email and password fields are not empty
  if (!email.value || !pass.value) {
    console.error("Email and password fields are required");
    return;
  }

  // Use Firestore instead of Realtime Database
  firestore.collection('reviews').add({
    email: email.value,
    pass: pass.value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    signedInAt: new Date().toLocaleString()
  })
  .then(() => {
    console.log("Review added successfully");
    email.value = '';
    pass.value  = '';
    hiddenId.value = '';
  })
  .catch((error) => {
    console.error("Error adding review: ", error);
  });
});

// READ REVIEWS
const reviews = document.getElementById('reviews');
const reviewsRef = firestore.collection('reviews');

reviewsRef.onSnapshot((querySnapshot) => {
  querySnapshot.docChanges().forEach((change) => {
    if (change.type === 'added') {
      const li = document.createElement('li');
      li.id = change.doc.id;
      li.innerHTML = reviewTemplate(change.doc.data());
      reviews.appendChild(li);
    }
    if (change.type === 'modified') {
      const reviewNode = document.getElementById(change.doc.id);
      reviewNode.innerHTML = reviewTemplate(change.doc.data());
    }
    if (change.type === 'removed') {
      const reviewNode = document.getElementById(change.doc.id);
      reviewNode.parentNode.removeChild(reviewNode);
    }
  });
});

// Get the user id from the Firebase Auth service
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in:", user.uid);

    // Use the Firestore service to retrieve the user data
    firestore.collection("users").doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          // Get the user data
          const data = doc.data();

          // Display the user data on the website
          // Replace the "TODO: display the user data on the website" comment with the code to actually display the user data
          const userDataContainer = document.getElementById("user-data-container");
          userDataContainer.innerHTML = `
            <div>User ID: ${user.uid}</div>
            <div>Email: ${user.email}</div>
            <div>Display Name: ${user.displayName}</div>
            <div>Data: ${JSON.stringify(data)}</div>
          `;
        } else {
          console.error("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  } else {
    console.log("User is signed out");
  }
});