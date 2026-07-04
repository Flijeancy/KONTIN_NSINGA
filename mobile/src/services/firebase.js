// firebase client helpers (modular SDK)
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Remplir depuis vos variables d'environnement dans l'app (danger: pour dev seulement)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'YOUR_API_KEY',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'PROJECT.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'PROJECT_ID',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'PROJECT.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || 'SENDER_ID',
  appId: process.env.FIREBASE_APP_ID || 'APP_ID'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Helper: convert phone to internal email to use email/password auth
function phoneToEmail(phone){
  // sanitize phone: remove spaces
  const clean = phone.replace(/\s+/g,'');
  return `${clean}@kontin.local`;
}

export async function signUpWithPhonePassword(phone, password){
  const email = phoneToEmail(phone);
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  // store user profile in Firestore
  const usersRef = collection(db,'users');
  await addDoc(usersRef,{ uid: userCred.user.uid, phone, createdAt: new Date() });
  return userCred;
}

export async function signInWithPhonePassword(phone, password){
  const email = phoneToEmail(phone);
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function createIncident({ type, description, mediaUri, location }){
  const incidentsRef = collection(db,'incidents');
  let mediaUrl = null;
  if (mediaUri){
    const response = await fetch(mediaUri);
    const blob = await response.blob();
    const name = `incidents/${Date.now()}`;
    const storageRef = ref(storage, name);
    await uploadBytes(storageRef, blob);
    mediaUrl = await getDownloadURL(storageRef);
  }
  const doc = await addDoc(incidentsRef,{
    type,
    description,
    mediaUrl,
    location: { lat: location.coords.latitude, lng: location.coords.longitude },
    createdAt: new Date(),
    status: 'open'
  });
  return doc;
}

export function listenIncidents(onUpdate){
  const q = query(collection(db,'incidents'), orderBy('createdAt','desc'));
  return onSnapshot(q, (snapshot)=>{
    const data = snapshot.docs.map(d=>({ id:d.id, ...d.data() }));
    onUpdate(data);
  });
}
