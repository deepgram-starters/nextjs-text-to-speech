import { NextResponse } from "next/server";
import { issueSession } from "../../lib/session";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({ token: issueSession() });
}
