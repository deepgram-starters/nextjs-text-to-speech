import {
  BaseSyntheticEvent,
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";

import { SendIcon } from "./icons/SendIcon";
import { useNowPlaying } from "react-nowplaying";
import TextareaAutosize from "react-textarea-autosize";
import { isBrowser, isDesktop, isMacOs } from "react-device-detect";

const Controls = ({
  callback,
}: {
  callback: Dispatch<SetStateAction<any>>;
}) => {
  const [text, setText] = useState<string>();
  const { stop: stopAudio, play: playAudio } = useNowPlaying();

  const sendText = useCallback(
    async (event: BaseSyntheticEvent) => {
      callback(new (window.AudioContext || window.webkitAudioContext)());

      stopAudio();

      const model = "aura-asteria-en";

      const response = await fetch(`/api/speak?model=${model}`, {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify({ text }),
      });

      stopAudio();
      setText("");

      playAudio(await response.blob(), "audio/mp3");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text]
  );

  return (
    <div className="relative">
      <div className="flex bg-[#101014] rounded-full">
        <div className="flex-grow rounded-tl-[2rem] rounded-bl-[2rem] bg-gradient-to-l from-[#13EF93]/50 via-[#13EF93]/80 to-[#149AFB]/80 ps-0.5 py-0.5 inline">
          <div className=" bg-[#101014] h-full rounded-tl-[2rem] rounded-bl-[2rem]">
            <TextareaAutosize
              onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
                if (event.key !== "Enter" || !isDesktop) return;

                /**
                 * On a desktop/browser they press Ctrl+Enter or Cmd+Enter to submit the message.
                 */
                if ((isMacOs && event.metaKey) || (!isMacOs && event.ctrlKey)) {
                  sendText(event);
                }
              }}
              rows={1}
              spellCheck={false}
              autoCorrect="off"
              className="py-2 md:py-4 -mb-[0.4rem] min-h-10 rounded-tl-[2rem] rounded-bl-[2rem] overflow-hidden sm:px-8 w-full resize-none bg-[#101014] text-light-900 border-0 text-sm sm:text-base outline-none focus:ring-0"
              placeholder={`Enter text to turn into speech... ${isDesktop && isBrowser && (isMacOs ? "Press ⌘ + Enter to submit." : "Press Ctrl + Enter to submit.")}`}
              value={text}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                setText(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="inline h-auto rounded-tr-[2rem] rounded-br-[2rem] bg-gradient-to-l to-[#13EF93]/50 from-[#149AFB]/80 pe-0.5 py-0.5">
          <button
            type="button"
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              sendText(event);
            }}
            className="w-16 md:w-24 h-full py-2 md:py-4 px-2 rounded-tr-[2rem] rounded-br-[2rem] font-bold bg-[#101014] text-light-900 text-sm sm:text-base flex items-center justify-center"
          >
            {/* <span>Send text</span> */}
            <SendIcon className="w-5 md:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
