import crypto from "crypto";

export default function requireBearerToken(req, res, next) {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Server authentication is not configured" });
  }

  const header = req.get("authorization") || "";
  const match = header.match(/^Bearer\s+(\S+)$/i);
  const token = match?.[1] ?? "";

  const expected = crypto.createHash("sha256").update(apiKey).digest();
  const received = crypto.createHash("sha256").update(token).digest();

  if (!token || !crypto.timingSafeEqual(expected, received)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}
