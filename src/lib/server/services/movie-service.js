// Author: Alex D
import { db } from "$lib/server/db";
import { movies, genres, movieGenres } from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";

export const moviesService = {
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