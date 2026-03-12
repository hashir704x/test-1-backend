import type { Context, Next } from "hono";
import { auth } from "./auth";

export async function requireAuth(c: Context, next: Next) {
  const sessionResult = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!sessionResult) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", sessionResult.user);
  c.set("session", sessionResult.session);

  return next();
}
