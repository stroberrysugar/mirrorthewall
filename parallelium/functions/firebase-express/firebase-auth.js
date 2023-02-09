const admin = require("firebase-admin");
const serviceAccount = require("./Parallelium/functions/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://parallelium-804cb.firebaseio.com/"
});

function getUserData(userId) {
  return admin.auth().getUser(userId)
    .then(function(userRecord) {
      return userRecord.toJSON();
    })
    .catch(function(error) {
      console.error('Error fetching user data:', error);
    });
}