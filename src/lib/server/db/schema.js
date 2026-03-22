import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const movies = sqliteTable("movies", {
  id: integer("id").primaryKey(),
  title: text("title"),
  rating: text("rating"),
  poster: text("poster")
});

export const genres = sqliteTable("genres", {
  id: integer("id").primaryKey(),
  name: text("name")
});

export const movieGenres = sqliteTable("movie_genres", {
  movieId: integer("movie_id"),
  genreId: integer("genre_id")
});
