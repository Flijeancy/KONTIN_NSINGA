# Architecture

- Frontend: Expo (React Native) mobile app
- Backend: Firebase Firestore (realtime), Storage (médias), Authentication
- Cloud Functions: notifications push + SMS (Twilio)
- Offline: queue locale (AsyncStorage / SQLite) synchronisé quand réseau disponible

Géolocalisation et notifications ciblées
- Utiliser GeoFirestore / geohashing pour retrouver utilisateurs dans un rayon (5 km)
- Cloud Function calcule les utilisateurs à notifier et envoie push / SMS

Sécurité
- Règles Firestore strictes: seuls propriétaires modifient leurs signalements
- Consentement explicite pour accès caméra & localisation
