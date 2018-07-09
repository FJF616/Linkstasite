const config = require('./config.json');
const InstagramLogin = require('../../util/InstagramLogin')

export default function signInFirebaseTemplate(token) {
    
  token = InstagramLogin.getAccessToken();
  return `
      <script src="https://www.gstatic.com/firebasejs/3.6.0/firebase.js"></script>
      <script>
        var token = '${token}';
        var config = {
          apiKey: '${config.firebase.apiKey}'
        };
        var app = firebase.initializeApp(config);
        app.auth().signInWithCustomToken(token).then(function() {
          window.close();
        });
      </script>`;
  }