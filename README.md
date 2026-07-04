# KONTIN_NSINGA

Application mobile pour le signalement des incidents urbains à Kinshasa — scaffold initial.

Ce dépôt contient un starter pour une application Expo (React Native) et un template de Cloud Functions (Firebase) pour les notifications et SMS.

Fonctionnalités ciblées (MVP):
- Inscription / connexion (téléphone + mot de passe)
- Signalement d'incident avec photo / vidéo
- Géolocalisation automatique
- Carte des incidents en temps réel
- Notifications push (rayon 5 km)
- Alertes SMS via Twilio
- Historique des signalements
- Mode hors-ligne (queue locale)

Prérequis
- Node >= 16
- Expo CLI (optionnel pour dev mobile)
- Un projet Firebase (Auth, Firestore, Storage, Cloud Functions)
- Compte Twilio (SID, TOKEN, numéro)
- Clé Google Maps (Android/iOS)

Variables d'environnement nécessaires (exemples):
- FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID
- TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
- EXPO_PUSH_SERVER_KEY (optionnel si vous utilisez Expo push)
- GOOGLE_MAPS_API_KEY

Ce que j'ai créé
- mobile/ : starter Expo app
- backend/functions/ : template Cloud Functions
- docs/ : architecture et modèle de données
- README + .gitignore

Prochaines étapes recommandées : configurez un projet Firebase, remplissez les variables d'environnement, puis lancez l'app Expo et déployez les functions.
