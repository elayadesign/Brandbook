# Firebase Setup Guide for Brand Book

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: "brandbook" (or any name you prefer)
4. Follow the setup wizard (disable Google Analytics if you want)

## Step 2: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for now)
4. Select a location close to you

## Step 3: Get Firebase Config

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (</>)
4. Enter app nickname: "brandbook-web"
5. Copy the config object

## Step 4: Update the Code

Replace the placeholder config in `index.html` with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-actual-app-id"
};
```

## Step 5: Deploy

1. Upload your files to any web hosting service (Vercel, Netlify, GitHub Pages, etc.)
2. Your brand book will now sync across all devices and browsers!

## Security Rules (Optional)

For production, update Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For now, anyone can read/write
    }
  }
}
```

## Features

- ✅ **Cross-device sync** - Works on all browsers and devices
- ✅ **Real-time updates** - Changes appear instantly
- ✅ **Offline fallback** - Uses localStorage if Firebase is unavailable
- ✅ **Visual feedback** - Shows save status and source (cloud/local)
