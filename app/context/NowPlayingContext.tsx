"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";

interface NowPlayingContextValue {
  player: HTMLAudioElement | null;
  play: (audio: Blob, mimeType: string) => void;
  stop: () => void;
}

const NowPlayingContext = createContext<NowPlayingContextValue | undefined>(undefined);

export function NowPlayingContextProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [player, setPlayer] = useState<HTMLAudioElement | null>(null);

  const stop = () => {
    const current = playerRef.current;
    if (!current) return;
    current.pause();
    URL.revokeObjectURL(current.src);
    playerRef.current = null;
    setPlayer(null);
  };

  const play = (audio: Blob, mimeType: string) => {
    stop();
    const player = new Audio(URL.createObjectURL(new Blob([audio], { type: mimeType })));
    player.onended = stop;
    playerRef.current = player;
    setPlayer(player);
    void player.play();
  };

  return (
    <NowPlayingContext.Provider value={{ player, play, stop }}>
      {children}
    </NowPlayingContext.Provider>
  );
}

export function useNowPlaying() {
  const context = useContext(NowPlayingContext);
  if (!context) throw new Error("useNowPlaying must be used within a NowPlayingContextProvider");
  return context;
}
