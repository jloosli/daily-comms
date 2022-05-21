// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { getMessaging, onBackgroundMessage, isSupported } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging-sw.js';

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

const app = initializeApp({
  projectId: 'daily-comms',
  appId: '1:514735131676:web:a29ce537c75b02c2ad23d9',
  storageBucket: 'daily-comms.appspot.com',
  locationId: 'us-central',
  apiKey: 'AIzaSyBKbb4_fw0FHh2_Ip7V7jgY49JIieydBXc',
  authDomain: 'daily-comms.firebaseapp.com',
  messagingSenderId: '514735131676',
});

isSupported().then(isSupported => {

  if (isSupported) {

    const messaging = getMessaging(app);

    onBackgroundMessage(messaging, (payload) => {
      const { notification: { title, body, click_action } } = payload;
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      self.registration.showNotification(title, { body, click_action });
    });



  }

});
