import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    title: "Next.js Text-to-Speech",
    description: "Get started using Deepgram's Text-to-Speech with this Next.js demo app",
    author: "Deepgram DX Team <devrel@deepgram.com> (https://developers.deepgram.com)",
    repository: "https://github.com/deepgram-devs/nextjs-text-to-speech",
    useCase: "text-to-speech",
    language: "javascript",
    framework: "nextjs",
    sdk: "@deepgram/sdk",
    tags: ["text-to-speech", "tts", "speech-synthesis", "javascript", "nextjs", "react"],
  });
}
