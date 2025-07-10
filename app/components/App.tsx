"use client";

import { useNowPlaying } from "react-nowplaying";
import dynamic from "next/dynamic";
import { useState } from "react";

// ============================================
// FEATURE: Audio Visualizer
// To remove: Delete this import and the <Visualizer /> component below
// ============================================
import Visualizer from "./Visualizer";

// ============================================
// FEATURE: Text Input + Audio Playback + Deepgram Integration
// To remove: Delete this import and the <Controls /> component below
// Note: This component handles text input, Deepgram API calls, and audio playback
// ============================================
const Controls = dynamic(() => import("./Controls"), {
  ssr: false,
});

const App: () => JSX.Element = () => {
  // Audio context is only needed if you're using the Visualizer
  // If you remove the Visualizer, you can also remove this state
  const [context, setContext] = useState<AudioContext>();

  // Audio player is managed by react-nowplaying
  // If you remove audio playback, you can remove this hook
  const { player } = useNowPlaying();

  return (
    <>
      <div className="flex h-full antialiased">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full">
            <div className="relative w-full h-full">
              {/* ============================================
                  AUDIO VISUALIZER COMPONENT
                  Delete this entire block to remove the visualizer
                  ============================================ */}
              {context && player && (
                <Visualizer source={player} context={context} />
              )}

              {/* ============================================
                  TEXT INPUT & AUDIO CONTROLS
                  Delete this entire block to remove:
                  - Text input area
                  - Deepgram text-to-speech integration
                  - Audio playback controls
                  
                  Note: The Controls component is self-contained and handles
                  all the text-to-speech functionality
                  ============================================ */}
              <div className="absolute bottom-[8rem] inset-x-0 max-w-4xl mx-auto text-center">
                <Controls
                  callback={(ctx: AudioContext) => {
                    setContext(ctx);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
