const functions = require('firebase-functions');
const REGION = 'europe-west3';
const rfunctions = functions.region(REGION);

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const currentTime = admin.firestore.FieldValue.serverTimestamp();
const increment = admin.firestore.FieldValue.increment(1);

exports.onCreateEmotion = rfunctions.firestore
  .document('emotions/{emotionId}')
  .onCreate(async (snap, context) => {
    const emotion = snap.data();

    let batch = db.batch();

    batch.set(
      db.collection('users').doc(emotion.uid),
      {
        emotionsCount: increment,
        lastEmotionTime: currentTime,
      },
      {merge: true},
    );

    batch.set(
      db.collection('emotions').doc('--stats--'),
      {
        emotionsCount: increment,
        lastEmotionTime: currentTime,
      },
      {merge: true},
    );

    await batch.commit();
  });

exports.sendEmotion = rfunctions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'The function must be called while authenticated.',
    );
  }

  const uid = context.auth.uid;
  const {emotion} = data;

  if (typeof emotion !== 'string' || emotion.length > 2) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'Invalid input.',
    );
  }

  await db.collection('emotions').add({
    uid: uid,
    emotion: emotion,
    createdAt: currentTime,
  });

  return {
    result: 'Ok',
  };
});
