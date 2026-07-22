import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(160),
  message: z.string().trim().min(20).max(2000),
  website: z.string().max(0).optional(),
});

const requests = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwardedFor || "local";
  const now = Date.now();
  const recent = (requests.get(key) || []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= LIMIT) return Response.json({ message: "Too many messages. Please wait a few minutes and try again." }, { status: 429 });

  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ message: "Invalid request." }, { status: 400 }); }
  const result = contactSchema.safeParse(body);
  if (!result.success) return Response.json({ message: "Please check your name, email, and message." }, { status: 400 });
  requests.set(key, [...recent, now]);

  return Response.json({ message: "Email delivery is not configured yet. Please use the direct email link once contact details are added." }, { status: 503 });
}
