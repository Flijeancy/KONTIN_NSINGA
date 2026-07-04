# Modèle de données (Firestore)

users/{userId}
- uid: string
- phone: string
- displayName: string
- createdAt: timestamp
- expoPushToken: string (optionnel)
- smsEnabled: boolean
- location: geopoint (optionnel)

incidents/{incidentId}
- reporterId: string
- type: string
- description: string
- mediaUrl: string
- location: { lat: number, lng: number }
- createdAt: timestamp
- status: string (open/closed/in_progress)
- severity: string (low/medium/high)

notifications/{id} (optionnel)
- type, payload, createdAt, deliveredTo[]
