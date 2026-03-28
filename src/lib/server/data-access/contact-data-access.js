import { db } from "$lib/server/db";
import { contacts } from "$lib/server/db/schema";

export async function createContact({ name, email, message }) {
  return await db.insert(contacts).values({
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  }).run();
}