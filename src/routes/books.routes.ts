import { Hono } from "hono";
import { requireAuth } from "../lib/helper";
import { getAllBooks } from "../controllers/books.controllers";

const booksRoutes = new Hono();
booksRoutes.use("*", requireAuth);

booksRoutes.get("/", getAllBooks);

export { booksRoutes };
