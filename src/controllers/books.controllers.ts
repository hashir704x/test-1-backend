import { Context } from "hono";

export async function getAllBooks(c: Context) {
  // @ts-ignore
  console.log("user:", c.get("user"));
  return c.json({ booksData: [] });
}
