// firebase.js
// Replace the config object with YOUR firebase project config
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_PROJECT.firebaseapp.com",
  projectId: "REPLACE_PROJECT",
  storageBucket: "REPLACE_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

if(!window.firebase || !firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  console.log('Firebase initialized');
}
