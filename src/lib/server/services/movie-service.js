// Author: Alex D & Glen J

// Third party
import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";
// Ours
import { movies, genres, movieGenres } from "$lib/server/db/schema.js";
import { moviesDataAccess } from "../data-access/movie-data-access";


export async function addMovie(movie) {
  const result = await db
    .insert(movies)
    .values({
      title: movie.title,
      rating: movie.rating,
      poster: movie.poster,
      description: movie.description,
      ratingScore: movie.ratingScore
    })
    .returning();
  return result[0];
}

export async function deleteMovie(id) {
  await db
    .delete(movieGenres)
    .where(eq(movieGenres.movieId, id));
  return await db
    .delete(movies)
    .where(eq(movies.id, id));
}

export async function updateMovie(id, movie) {
  const result = await db
    .update(movies)
    .set({
      title: movie.title,
      rating: movie.rating,
      poster: movie.poster,
      description: movie.description,
      ratingScore: movie.ratingScore
    })
    .where(eq(movies.id, id))
    .returning();
  return result[0];
}
export const moviesService = {
  async getMovieById(MovieId) {
    return moviesDataAccess.getMovieById(MovieId)
  },

  addMovie,
  deleteMovie,
  updateMovie,
  async getAllMovies() {
    const results = await db
      .select({
        id: movies.id,
        title: movies.title,
        ageRating: movies.rating,
        poster: movies.poster,
        description: movies.description,
        ratingScore: movies.ratingScore,
        genre: genres.name
      })
      .from(movies)
      .leftJoin(movieGenres, eq(movies.id, movieGenres.movieId))
      .leftJoin(genres, eq(movieGenres.genreId, genres.id));

    const movieMap = {};

    for (const row of results) {
      if (!movieMap[row.id]) {
        movieMap[row.id] = {
          id: row.id,
          title: row.title,
          ageRating: row.ageRating || "N/A",
          poster: row.poster || "/placeholder.jpg",
          description: row.description || "No description available.",
          ratingScore: row.ratingScore || "N/A",
          genre: []
        };
      }
      if (row.genre && !movieMap[row.id].genre.includes(row.genre)) {
        movieMap[row.id].genre.push(row.genre);
      }
    }
  
    return Object.values(movieMap);
  }
  
};