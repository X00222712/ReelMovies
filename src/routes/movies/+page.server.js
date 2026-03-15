import db from "$lib/server/db";

export function load() {

  const movies = db.prepare(`
    SELECT
      movies.id,
      movies.title,
      movies.rating,
      movies.poster,
      GROUP_CONCAT(genres.name, ', ') AS genre
    FROM movies
    LEFT JOIN movie_genres ON movies.id = movie_genres.movie_id
    LEFT JOIN genres ON genres.id = movie_genres.genre_id
    GROUP BY movies.id
  `).all();

  const genres = db.prepare(`
    SELECT name FROM genres
  `).all();

  const ratings = db.prepare(`
    SELECT DISTINCT rating FROM movies
  `).all();

  return {
    movies,
    genres: genres.map(g => g.name),
    ratings: ratings.map(r => r.rating)
  };
}