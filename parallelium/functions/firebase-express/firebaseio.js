const firebase = require("firebase/app");
require("firebase/firestore");

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

firebase.initializeApp(config);
const db = firebase.firestore();

function getDocumentData(collection, document) {
  return db.collection(collection).doc(document).get()
    .then(function(doc) {
      return doc.data();
    })
    .catch(function(error) {
      console.error('Error fetching document data:', error);
    });
}