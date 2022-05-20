// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/[the number of version matching with firebase in package.json]/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/[for example: 7.16.1]/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
  projectId: 'daily-comms',
  appId: '1:514735131676:web:a29ce537c75b02c2ad23d9',
  storageBucket: 'daily-comms.appspot.com',
  locationId: 'us-central',
  apiKey: 'AIzaSyBKbb4_fw0FHh2_Ip7V7jgY49JIieydBXc',
  authDomain: 'daily-comms.firebaseapp.com',
  messagingSenderId: '514735131676',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
