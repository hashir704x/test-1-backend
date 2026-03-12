import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/db";
import * as schema from "../database/schema";

if (!process.env.FRONTEND_URL) {
  throw new Error("Failed to load frontend url");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: schema,
  }),
  emailAndPassword: { enabled: true },
  trustedOrigins: [process.env.FRONTEND_URL],
});
