import { createClient } from "@deepgram/sdk";
import { NextRequest, NextResponse } from "next/server";

/**
 * Deepgram Text-to-Speech API Route
 * 
 * This route handles text-to-speech conversion using Deepgram's API.
 * 
 * To remove Deepgram integration:
 * 1. Delete this entire /api/speak directory
 * 2. Delete app/services/deepgram.ts
 * 3. Replace the textToSpeech call in Controls.tsx with your own solution
 * 4. Remove DEEPGRAM_API_KEY from .env.local
 * 5. Remove @deepgram/sdk from package.json
 * 
 * Required environment variable:
 * - DEEPGRAM_API_KEY: Your Deepgram API key (get one at https://console.deepgram.com)
 */

export const revalidate = 0;

/**
 * POST /api/speak
 * 
 * Request body: { text: string }
 * Query params: model (optional) - Deepgram voice model to use
 * Response: Audio stream (MP3 format)
 */
export async function POST(request: NextRequest) {
  // gotta use the request object to invalidate the cache every request :vomit:
  const url = request.url;
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY ?? "");

  // Get the voice model from query params, default to aura-asteria-en
  const model = request.nextUrl.searchParams.get("model") ?? "aura-asteria-en";

  // Get the text from request body
  const message = await request.json();

  console.log("TTS Request:", { model, text: message.text?.substring(0, 50) + "..." });

  // Make the request to Deepgram
  const result = await deepgram.speak.request(message, { model });
  const stream = await result.getStream();
  const headers = await result.getHeaders();

  // Return the audio stream with appropriate headers
  const response = new NextResponse(stream, { headers });

  // Disable caching to ensure fresh audio generation
  response.headers.set("Surrogate-Control", "no-store");
  response.headers.set(
    "Cache-Control",
    "s-maxage=0, no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  response.headers.set("Expires", "0");

  return response;
}
