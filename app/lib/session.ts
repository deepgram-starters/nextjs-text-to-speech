import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const fallbackSecret = randomBytes(32).toString("hex");

function secret() {
  return process.env.SESSION_SECRET || process.env.DEEPGRAM_API_KEY || fallbackSecret;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function issueSession() {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })).toString("base64url");
  return `${header}.${payload}.${sign(`${header}.${payload}`)}`;
}

export function hasValidSession(authorization: string | null) {
  if (!authorization?.startsWith("Bearer ")) return false;

  const token = authorization.slice(7);
  const [header, payload, signature, extra] = token.split(".");
  if (!header || !payload || !signature || extra) return false;

  const expected = sign(`${header}.${payload}`);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return false;
  }

  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof exp === "number" && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
