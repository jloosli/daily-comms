import * as functions from "firebase-functions";

exports.scheduledFunctionCrontab = functions.pubsub.schedule("0 10 * * *").timeZone("America/Denver")
  .onRun((context) => {
    // This will be executed every day at 9:00 AM
    console.log("This should run at 10 am.");
    return null;
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
