import { Dispatch, SetStateAction, useCallback, useState } from "react";

import { SendIcon } from "./icons/SendIcon";
import { useNowPlaying } from "react-nowplaying";

// ============================================
// FEATURE: Text Input
// To remove: Delete this import and replace the <TextInput /> component
// with your own input method or hardcoded text
// ============================================
import TextInput from "./TextInput";

// ============================================
// FEATURE: Deepgram Integration
// To remove: Delete this import and replace textToSpeech call
// with your own text-to-speech solution
// ============================================
import { textToSpeech } from "../services/deepgram";

interface ControlsProps {
  callback: Dispatch<SetStateAction<any>>;
}

/**
 * Controls Component
 *
 * This component orchestrates the text-to-speech flow:
 * 1. Text input from user
 * 2. Send text to Deepgram API
 * 3. Play the returned audio
 *
 * Each feature can be removed independently by following
 * the instructions in the comments above each import.
 *
 * FEATURE: Audio Playback
 * To remove audio playback:
 * 1. Remove the useNowPlaying import and hook
 * 2. Remove the playAudio and stopAudio calls
 * 3. Handle the audio blob differently (e.g., provide download link)
 * 4. Remove react-nowplaying from package.json
 */
const Controls: React.FC<ControlsProps> = ({ callback }) => {
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // ============================================
  // AUDIO PLAYBACK
  // Remove this hook and its usage to disable audio playback
  // ============================================
  const { stop: stopAudio, play: playAudio } = useNowPlaying();

  const handleSubmit = useCallback(async () => {
    if (!text?.trim()) return;

    try {
      setIsLoading(true);

      // Create audio context for visualizer (if being used)
      callback(new (window.AudioContext || window.webkitAudioContext)());

      // Stop any currently playing audio
      stopAudio();

      // ============================================
      // DEEPGRAM API CALL
      // Replace this with your own TTS solution if removing Deepgram
      // ============================================
      const audio = await textToSpeech({
        text,
        model: "aura-2-thalia-en", // You can make this configurable
      });

      // Clear the text input after successful conversion
      setText("");

      // ============================================
      // PLAY AUDIO
      // Remove this line to disable auto-play
      // You could instead create a download link:
      // const url = URL.createObjectURL(audio);
      // ============================================
      playAudio(audio, "audio/mp3");
    } catch (error) {
      console.error("Text-to-speech failed:", error);
      // Handle error (you might want to show a toast or error message)
    } finally {
      setIsLoading(false);
    }
  }, [text, callback, stopAudio, playAudio]);

  return (
    <div className="relative">
      <div className="flex bg-[#101014] rounded-full">
        <div className="flex-grow rounded-tl-[2rem] rounded-bl-[2rem] bg-gradient-to-l from-[#13EF93]/50 via-[#13EF93]/80 to-[#149AFB]/80 ps-0.5 py-0.5 inline">
          <div className="bg-[#101014] h-full rounded-tl-[2rem] rounded-bl-[2rem]">
            {/* ============================================
                TEXT INPUT COMPONENT
                Remove this and replace with your own input
                or hardcoded text for testing
                ============================================ */}
            <TextInput
              value={text}
              onChange={setText}
              onSubmit={handleSubmit}
            />
          </div>
        </div>

        <div className="inline h-auto rounded-tr-[2rem] rounded-br-[2rem] bg-gradient-to-l to-[#13EF93]/50 from-[#149AFB]/80 pe-0.5 py-0.5">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !text?.trim()}
            className="w-16 md:w-24 h-full py-2 md:py-4 px-2 rounded-tr-[2rem] rounded-br-[2rem] font-bold bg-[#101014] text-light-900 text-sm sm:text-base flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendIcon className="w-5 md:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
