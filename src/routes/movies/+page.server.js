import { db } from "$lib/server/db/db";
import { movies, genres, movieGenres } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function load() {

  const result = await db
    .select({
      id: movies.id,
      title: movies.title,
      rating: movies.rating,
      poster: movies.poster,
      genre: genres.name
    })
    .from(movies)
    .leftJoin(movieGenres, eq(movies.id, movieGenres.movieId))
    .leftJoin(genres, eq(movieGenres.genreId, genres.id));

  const movieMap = {};

  for (const row of result) {

    if (!movieMap[row.id]) {
      movieMap[row.id] = {
        id: row.id,
        title: row.title,
        rating: row.rating,
        poster: row.poster,
        genres: []
      };
    }

    if (row.genre) {
      movieMap[row.id].genres.push(row.genre);
    }
  }

  const moviesList = Object.values(movieMap);

  const allGenres = await db.select().from(genres);

  return {
    movies: moviesList,
    genres: allGenres.map(g => g.name)
  };
}