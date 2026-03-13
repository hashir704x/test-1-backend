import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/db";
import * as schema from "../database/schema";

if (!process.env.FRONTEND_URL) {
  throw new Error("Failed to load frontend url");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: { enabled: true },
  trustedOrigins: [process.env.FRONTEND_URL],
  baseURL: process.env.BETTER_AUTH_URL,
  advanced: {
    useSecureCookies: true,
    defaultCookieAttributes: { sameSite: "none", secure: true, httpOnly: true },
  },
});
