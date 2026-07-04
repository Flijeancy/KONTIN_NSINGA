const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Twilio setup
const twilio = require('twilio');
const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const client = TWILIO_SID && TWILIO_TOKEN ? twilio(TWILIO_SID, TWILIO_TOKEN) : null;

// Example: on new incident, notify nearby users via push (FCM) and optionally SMS
exports.onNewIncident = functions.firestore.document('incidents/{incidentId}').onCreate(async (snap, context) => {
  const incident = snap.data();
  const { location, type } = incident;

  // TODO: implement geohash / radius search (geofirestore) to find users in 5km
  // For demo: send to all users with expoPushToken in /users
  const usersSnap = await admin.firestore().collection('users').get();
  const tokens = [];
  const smsRecipients = [];
  usersSnap.forEach(u=>{
    const data = u.data();
    if (data.expoPushToken) tokens.push(data.expoPushToken);
    if (data.smsEnabled && data.phone) smsRecipients.push(data.phone);
  });

  // Send push via FCM
  const messaging = admin.messaging();
  const message = {
    notification: { title: `Nouvel incident: ${type}`, body: incident.description || '' },
    data: { incidentId: context.params.incidentId }
  };
  // send to tokens in batches
  const chunks = []; while(tokens.length) chunks.push(tokens.splice(0,500));
  for (const chunk of chunks){
    await messaging.sendToDevice(chunk, message).catch(console.error);
  }

  // Send SMS via Twilio (optional)
  if (client && smsRecipients.length){
    for (const to of smsRecipients){
      try{
        await client.messages.create({ body: `Alerte incident: ${type} - ${incident.description || ''}`, from: TWILIO_NUMBER, to });
      }catch(e){ console.error('SMS error', e); }
    }
  }

  return null;
});
