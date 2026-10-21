import { DeepgramClient } from "@deepgram/sdk";
import { NextRequest, NextResponse } from "next/server";
import { hasValidSession } from "../../lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authenticationError(code: "MISSING_TOKEN" | "INVALID_TOKEN", message: string) {
  return NextResponse.json(
    { error: { type: "AuthenticationError", code, message } },
    { status: 401 }
  );
}

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return authenticationError("MISSING_TOKEN", "Authorization header with Bearer token is required");
  }
  if (!hasValidSession(authorization)) {
    return authenticationError("INVALID_TOKEN", "Invalid or expired session token");
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.text !== "string" || !body.text.trim()) {
    return NextResponse.json(
      { error: { type: "ValidationError", code: "EMPTY_TEXT", message: "Text must be a non-empty string" } },
      { status: 400 }
    );
  }

  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: { type: "ConfigurationError", code: "MISSING_API_KEY", message: "DEEPGRAM_API_KEY is required" } },
      { status: 500 }
    );
  }

  try {
    const model = request.nextUrl.searchParams.get("model") ?? "aura-2-thalia-en";
    const deepgram = new DeepgramClient({ apiKey });
    const audio = await deepgram.speak.v1.audio.generate({ text: body.text, model });
    const response = new NextResponse(await audio.arrayBuffer(), {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: { type: "GenerationError", code: "SYNTHESIS_FAILED", message: "Unable to synthesize speech" } },
      { status: 502 }
    );
  }
}
