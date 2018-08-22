const serviceAccount = require('./service-account.json');
const firebase = require('firebase');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});



function createFirebaseToken(instagramID) {
  // The uid we'll assign to the user.
  const uid = `instagram:${instagramID}`;

  // Create the custom token.
  return firebase.auth().createCustomToken(uid);
}
signInFirebaseTemplate(firebaseToken, userName, profilePic, accessToken);

export default function createFirebaseAccount(instagramID, displayName, photoURL, accessToken) {
    // The UID we'll assign to the user.
    const uid = `instagram:${instagramID}`;
  
    // Save the access token tot he Firebase Realtime Database.
    const databaseTask = firebase.database().ref(`/instagramAccessToken/${uid}`)
        .set(accessToken);
  
    // Create or update the user account.
    const userCreationTask = firebase.auth().updateUser(uid, {
      displayName: displayName,
      photoURL: photoURL
    }).catch(error => {
      // If user does not exists we create it.
      if (error.code === 'auth/user-not-found') {
        return firebase.auth().createUser({
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
      const token = firebase.auth().createCustomToken(uid);
      console.log('Created Custom token for UID "', uid, '" Token:', token);
      return token;
    });
  }
  function signInFirebaseTemplate(token, displayName, photoURL, instagramAccessToken) {
    return `
      <script src="https://www.gstatic.com/firebasejs/3.4.0/firebase.js"></script>
      <script src="promise.min.js"></script><!-- Promise Polyfill for older browsers -->
      <script>
        var token = '${token}';
        var config = {
          apiKey: MY_FIREBASE_API_KEY, // Change this!
          databaseURL: MY_DATABASE_URL // Change this!
        };
        // We sign in via a temporary Firebase app to update the profile.
        var tempApp = firebase.initializeApp(config, '_temp_');
        tempApp.auth().signInWithCustomToken(token).then(function(user) {
       
          // Saving the Instagram API access token in the Realtime Database.
          const tasks = [tempApp.database().ref('/instagramAccessToken/' + user.uid)
              .set('${instagramAccessToken}')];
     
          // Updating the displayname and photoURL if needed.
          if ('${displayName}' !== user.displayName || '${photoURL}' !== user.photoURL) {
            tasks.push(user.updateProfile({displayName: '${displayName}', photoURL: '${photoURL}'}));
          }
     
          // Wait for completion of above tasks.
          return Promise.all(tasks).then(function() {
            // Delete temporary Firebase app and sign in the default Firebase app, then close the popup.
            var defaultApp = firebase.initializeApp(config);
            Promise.all([
                defaultApp.auth().signInWithCustomToken(token),
                tempApp.delete()]).then(function() {
              window.close(); // We’re done! Closing the popup.
            });
          });
        });
      </script>`;
   }