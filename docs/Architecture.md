# Architecture

This Next.js starter app is designed to be modular, allowing you to easily remove features you don't need. The app consists of four main features that can be independently removed:

## Features

### 1. Text Input (`app/components/TextInput.tsx`)

- Provides a textarea for users to enter text
- Supports keyboard shortcuts (Cmd/Ctrl + Enter to submit)
- Auto-resizes based on content

**To remove:**

1. Delete `app/components/TextInput.tsx`
2. In `app/components/Controls.tsx`, remove the TextInput import and component
3. Replace with your own input method or hardcoded text

### 2. Deepgram Integration

- **API Route:** `app/api/speak/route.ts`
- **Service:** `app/services/deepgram.ts`
- Converts text to speech using Deepgram's API

**To remove:**

1. Delete `app/api/speak/` directory
2. Delete `app/services/deepgram.ts`
3. In `app/components/Controls.tsx`, replace the `textToSpeech` call with your own TTS solution
4. Remove `DEEPGRAM_API_KEY` from `.env.local`
5. Remove `@deepgram/sdk` from `package.json`

### 3. Audio Playback (in `app/components/Controls.tsx`)

- Plays generated audio using react-nowplaying
- Manages audio state (play/stop)
- Integrated into the Controls component

**To remove:**

1. In `app/components/Controls.tsx`:
   - Remove the `useNowPlaying` import
   - Remove the `stopAudio` and `playAudio` hook usage
   - Remove the `playAudio(audio, "audio/mp3")` call
2. Handle the audio blob differently (e.g., provide download link)
3. Remove `react-nowplaying` from `package.json`

### 4. Audio Visualizer (`app/components/Visualizer.tsx`)

- Creates animated bars that respond to audio frequencies
- Uses Web Audio API for real-time analysis

**To remove:**

1. Delete `app/components/Visualizer.tsx`
2. In `app/components/App.tsx`, remove the Visualizer import and component
3. Remove the audio context state management from `app/components/App.tsx`

## Component Structure

```
app/
├── components/
│   ├── App.tsx           # Main app component with layout
│   ├── Controls.tsx      # Orchestrates text input, API calls, and audio playback
│   ├── TextInput.tsx     # Text input component
│   └── Visualizer.tsx    # Audio visualization
├── services/
│   └── deepgram.ts       # Deepgram API service
└── api/
    └── speak/
        └── route.ts      # API endpoint for text-to-speech
```

## Data Flow

1. User enters text in `TextInput`
2. `Controls` component handles submission
3. Text is sent to `/api/speak` endpoint
4. Deepgram API converts text to audio
5. Audio blob is returned to `Controls`
6. `Controls` plays the audio using react-nowplaying
7. `Visualizer` analyzes and displays audio frequencies

## Customization Examples

### Remove Everything Except Deepgram API

Keep only the API route and create a simple curl-able endpoint:

- Delete all components
- Keep `app/api/speak/route.ts`
- Access via: `curl -X POST http://localhost:3000/api/speak -d '{"text":"Hello"}'`

### Replace Deepgram with Another TTS Provider

1. Create a new service file (e.g., `app/services/elevenlabs.ts`)
2. Implement the same interface as `textToSpeech`
3. Update the import in `Controls.tsx`

### Add Download Button Instead of Auto-play

1. In `Controls.tsx`, remove the `playAudio` call
2. Create a download link from the audio blob:

```typescript
const downloadUrl = URL.createObjectURL(audio);
const link = document.createElement("a");
link.href = downloadUrl;
link.download = "speech.mp3";
link.click();
```

### Static Text Demo (Remove Text Input)

1. Remove `TextInput` component
2. In `Controls.tsx`, use a predefined text:

```typescript
const demoText = "Welcome to our text-to-speech demo!";
// Use demoText instead of user input
```
