import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    title: "Next.js Text-to-Speech",
    description: "Deepgram Text-to-Speech with a shared HTML frontend and Next.js API backend",
    author: "Deepgram DX Team <devrel@deepgram.com> (https://developers.deepgram.com)",
    repository: "https://github.com/deepgram-devs/nextjs-text-to-speech",
    useCase: "text-to-speech",
    language: "javascript",
    framework: "nextjs",
    sdk: "@deepgram/sdk",
    tags: ["text-to-speech", "tts", "speech-synthesis", "javascript", "nextjs"],
  });
}
