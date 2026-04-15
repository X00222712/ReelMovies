import { db } from '$lib/server/db';
import { genres, movieGenres } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export async function getAllGenres() {
  return await db.select().from(genres);
}

export async function getGenreById(id) {
  const rows = await db.select().from(genres).where(eq(genres.id, id));
  return rows[0] ?? null;
}

export async function addGenre(name) {
  const result = await db.insert(genres).values({ name }).returning();
  return result[0];
}

export async function updateGenre(id, name) {
  const res = await db.update(genres).set({ name }).where(eq(genres.id, id)).returning();
  return res[0] ?? null;
}

export async function deleteGenre(id) {
  // remove mappings first, then delete the genre
  await db.delete(movieGenres).where(eq(movieGenres.genreId, id));
  return await db.delete(genres).where(eq(genres.id, id));
}

export const genreService = {
  getAllGenres,
  getGenreById,
  addGenre,
  updateGenre,
  deleteGenre
};
