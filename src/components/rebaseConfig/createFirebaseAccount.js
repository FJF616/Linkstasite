const serviceAccount = require('./service-account.json');
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});
export default function createFirebaseAccount(instagramID, displayName, photoURL, accessToken) {
    // The UID we'll assign to the user.
    const uid = `instagram:${instagramID}`;
  
    // Save the access token tot he Firebase Realtime Database.
    const databaseTask = admin.database().ref(`/instagramAccessToken/${uid}`)
        .set(accessToken);
  
    // Create or update the user account.
    const userCreationTask = admin.auth().updateUser(uid, {
      displayName: displayName,
      photoURL: photoURL
    }).catch(error => {
      // If user does not exists we create it.
      if (error.code === 'auth/user-not-found') {
        return admin.auth().createUser({
          uid: uid,
          displayName: displayName,
          photoURL: photoURL
        });
      }
      throw error;
    });
  
    // Wait for all async task to complete then generate and return a custom auth token.
    return Promise.all([userCreationTask, databaseTask]).then(() => {
      // Create a Firebase custom auth token.
      const token = admin.auth().createCustomToken(uid);
      console.log('Created Custom token for UID "', uid, '" Token:', token);
      return token;
    });
  }
  