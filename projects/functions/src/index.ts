import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

interface sendPushParams {
  userNumber: string;
}

const sendPush = async ({userNumber}: sendPushParams) => {
  const userRef = await admin.firestore().doc(`users/${userNumber}`).get();
  if (!userRef.exists) return null;
  const {FCMToken} = userRef.data() as unknown as { FCMToken: string };
  const payload = {
    token: FCMToken,
    webpush: {
      notification: {
        title: 'Daily Comm',
        body: 'Time to click (notification)',
        imageUrl: 'https://app.jrbank.co/assets/images/bank.png',
      },
      data: {
        body: 'Time to click (data)',
        click_action: 'https://daily-comms.web.app/',
      },
      fcmOptions: {
        link: 'https://daily-comms.web.app/',
      },
    },
  };
  const msgResponse = await admin.messaging().send(payload);
  return msgResponse;
};

const cronSchedule = '0 10 * * 1-5';
exports.scheduledFunctionCrontab = functions.pubsub.schedule(cronSchedule).timeZone('America/Denver')
  .onRun(async (context) => {
    // This will be executed every day at 10:00 AM
    console.log('This should run at 10 am.');
    const userCollRefs = await admin.firestore().collection('users').listDocuments();
    const userPushPromises = userCollRefs.map(it => sendPush({userNumber: it.id}));
    return Promise.all(userPushPromises);
  });

exports.sendPushNotification = functions.https.onRequest(async (request, response) => {
  const userNumber = request.query.userNumber as string;
  try {
    const msgResponse = await sendPush({userNumber});
    console.log('Successfully sent message:', msgResponse);
    response.send('success');
  } catch (error) {
    console.log('Error sending message:', error);
    response.send(`error:<br><pre>${JSON.stringify(error)}</pre>`);
  }
});
