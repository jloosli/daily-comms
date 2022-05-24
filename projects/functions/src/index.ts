import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.scheduledFunctionCrontab = functions.pubsub.schedule('0 10 * * *').timeZone('America/Denver')
  .onRun((context) => {
    // This will be executed every day at 9:00 AM
    console.log('This should run at 10 am.');
    return null;
  });

exports.sendPushNotification = functions.https.onRequest(async (request, response) => {
  const userNumber = request.query.userNumber;
  const userRef = await admin.firestore().doc(`users/${userNumber}`).get();
  if (userRef.exists) {
    const {FCMToken} = userRef.data() as unknown as { FCMToken: string };
    const payload = {
      token: FCMToken,
      webpush:{
        notification: {
          title: 'Daily Comm',
          body: 'Time to click',
          imageUrl: 'https://app.jrbank.co/assets/images/bank.png',
        },
        data: {
          body: 'Time to click',
          click_action: 'https://daily-comms.web.app/',
        },
        fcm_options: {
          link: "https://daily-comms.web.app/"
        }
      }
    };

    try {
      const msgResponse = await admin.messaging().send(payload);

      console.log('Successfully sent message:', msgResponse);
      response.send('success');
    } catch (error) {
      console.log('Error sending message:', error);
      response.send(`error:<br><pre>${JSON.stringify(error)}</pre>`);
    }
  }

});
