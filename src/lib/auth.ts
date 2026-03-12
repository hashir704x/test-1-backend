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
  advanced: {
    useSecureCookies: true,
    // REMOVE crossSubDomainCookies if using .vercel.app and .railway.app
    // It only works if both are on the SAME root domain (e.g. api.zaiqa.com and zaiqa.com)
    
    cookieOptions: {
      session_token: {
        attributes: {
          sameSite: "None", 
          secure: true,
          httpOnly: true,
          // 2026 FIX: Required for cross-site cookies on public suffixes
          partitioned: true, 
        },
      },
    },
  },
});