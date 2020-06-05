const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();
let db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onCall(() => {
  return ['lol', 'internet'];
});

exports.sendEmotion = functions.https.onCall((data, context) => {
  const {emotion} = data;

  db.collection('users')
    .doc('alovelace')
    .set({
      first: 'Ada',
      last: 'Lovelace',
      emotion: emotion,
      born: 1815,
    });

  return {
    result: 'Ok',
  };
});
