import React, { useEffect, useRef } from "react";

/**
 * Audio Visualizer Component
 *
 * This component creates an animated visualization that responds to audio playback.
 * It uses the Web Audio API to analyze audio frequencies and render them as bars.
 *
 * To remove the visualizer:
 * 1. Delete this file
 * 2. Remove the Visualizer import and component from App.tsx
 * 3. Remove the audio context state management from App.tsx
 *
 * Dependencies:
 * - Requires an AudioContext (created in Controls.tsx)
 * - Requires an audio source (HTMLAudioElement from react-nowplaying)
 */

type AudioInput = MediaStream | HTMLAudioElement;

const interpolateColor = (
  startColor: number[],
  endColor: number[],
  factor: number
): number[] => {
  const result = [];
  for (let i = 0; i < startColor.length; i++) {
    result[i] = Math.round(
      startColor[i] + factor * (endColor[i] - startColor[i])
    );
  }
  return result;
};

interface VisualizerProps {
  source: AudioInput;
  context?: AudioContext;
}

const Visualizer: React.FC<VisualizerProps> = ({ source, context }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!context) {
    context = new (window.AudioContext || window.webkitAudioContext)();
  }

  const analyser = context.createAnalyser();
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  useEffect(() => {
    let audioSource: AudioNode;

    if (source instanceof MediaStream) {
      audioSource = context!.createMediaStreamSource(source);
    } else {
      audioSource = context!.createMediaElementSource(source);
      audioSource.connect(context!.destination);
    }

    audioSource.connect(analyser);
    draw();

    return () => {
      audioSource.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  const draw = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const canvasContext = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    if (!canvasContext) return;

    canvasContext.clearRect(0, 0, width, height);

    const barWidth = 10;
    let x = 0;

    // Gradient colors matching the Deepgram brand
    const startColor = [19, 239, 147]; // Green
    const endColor = [20, 154, 251]; // Blue

    for (const value of dataArray) {
      const barHeight = (value / 255) * height * 2;
      const interpolationFactor = value / 255;
      const color = interpolateColor(startColor, endColor, interpolationFactor);

      canvasContext.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.1)`;
      canvasContext.fillRect(x, height - barHeight, barWidth, barHeight);
      x += barWidth;
    }
  };

  return <canvas ref={canvasRef} width={window.innerWidth}></canvas>;
};

export default Visualizer;
