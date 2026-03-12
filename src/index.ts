import { Hono } from "hono";
import { auth } from "./lib/auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { booksRoutes } from "./routes/books.routes";
const app = new Hono();
app.use(logger());

if (!process.env.FRONTEND_URL) {
  throw new Error("Failed to load frontend url");
}
  
app.use(
  "/api/*",
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));
app.route("/api/books", booksRoutes);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
