# EngTalk

A React Native app for practicing spoken English with real people. Tap once, get matched with another learner, and talk over a live voice call. I designed and hand-coded the whole app, plus the Node.js backend behind it.

**Live on Google Play, 500+ downloads:** https://play.google.com/store/apps/details?id=com.sonetadhikary.engtalk

<!-- Screenshots: add 3 to 4 phone screenshots here (matching, a live call, chat, leaderboard) -->

## What it does

- **Find a speaking partner:** one-tap matching with another learner who is online, with an optional gender filter
- **Live voice calls:** peer-to-peer audio over WebRTC, with a TURN server for users behind strict networks
- **Chat and inbox:** real-time messages through Socket.IO, with conversation history
- **Voice Bites:** record and share short voice clips on your profile
- **Social layer:** follow other learners, see who is online, view profiles and stats
- **Leaderboard and coins:** a ranking of top speakers plus gold and silver coins, with silver coins convertible in the app

## Tech stack

| Area | What I used |
|---|---|
| App | React Native, Expo (SDK with dev client), TypeScript |
| Navigation | Expo Router (file-based), bottom tabs and top tabs |
| Real-time | react-native-webrtc for calls, Socket.IO for signaling and chat |
| State and storage | Zustand with the slices pattern and Immer, MMKV for fast local storage |
| UI and performance | FlashList for long lists, Reanimated, Gesture Handler, Bottom Sheet |
| Media | expo-av for recording and playback, image picker with compression |
| Release | EAS Build, EAS Submit, OTA updates with expo-updates, in-app update prompts |
| Revenue | Google AdMob native ads |
| Backend (private repo) | Node.js, Express, a REST API plus WebSocket server, Cloudflare R2 for media |

## How the code is organized

```
app/              Screens, using Expo Router file-based routes
  (auth)/         Sign in and sign up
  (tabs)/         Home, explore, follow, profile and leaderboard tabs
  Call.tsx        The live voice call screen
  Chat.tsx        One-to-one chat
components/       57 reusable UI components
store/features/   Zustand slices, one per feature (auth, call, inbox, voice bites...)
libs/api/         Typed API calls to the backend
hooks/            Shared hooks
config.ts         Backend endpoints
```

## How a call works

1. The app asks the backend for a partner over Socket.IO.
2. When a match is found, both phones exchange WebRTC offers, answers and ICE candidates through the socket.
3. Audio flows directly between the two phones. If a direct connection fails, it is relayed through the TURN server.

## Run it locally

```bash
npm install
npx expo run:android   # WebRTC needs a development build, not Expo Go
```

The app points to the hosted backend in `config.ts`. The backend itself is a separate private repository.

## About me

I'm Sonet, a senior React Native developer. I build iOS and Android apps with Next.js dashboards and AI features, and I take over stuck apps and get them shipped.

LinkedIn: https://www.linkedin.com/in/sonetad
