"use client";

import { useNowPlaying } from "react-nowplaying";
import dynamic from "next/dynamic";
import { useState } from "react";
import Visualizer from "./Visualizer";

const Controls = dynamic(() => import("./Controls"), {
  ssr: false,
});

const App: () => JSX.Element = () => {
  const [context, setContext] = useState<AudioContext>();
  const { player } = useNowPlaying();

  return (
    <>
      <div className="flex h-full antialiased">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full">
            {/* height 100% minus 8rem */}
            <div className="relative w-full h-full">
              {context && player && (
                <Visualizer source={player} context={context} />
              )}
              <div className="absolute bottom-[8rem]  inset-x-0 max-w-4xl mx-auto text-center">
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
