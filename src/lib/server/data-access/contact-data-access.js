import { db } from "$lib/server/db";
import { contacts } from "$lib/server/db/schema";

export function createContact({ name, email, message }) {
  return db.insert(contacts).values({
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  }).run();
}