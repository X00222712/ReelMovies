// Author Alex D & Glen J

// third party
import { eq } from "drizzle-orm";
import { db } from "../db";
// Ours
import { genres, movieGenres, movies } from "../db/schema";

const movieInfo = {
    id          : movies.id,
    title       : movies.title,
    ageRating   : movies.rating,
    poster      : movies.poster,
    description : movies.description,
    ratingScore : movies.ratingScore,
    genre       : genres.name
}

export const moviesDataAccess = {
    async getMovieById(movieId) {
        const results = await db.select(movieInfo)
        .from(movies)
        .leftJoin(movieGenres, eq(movies.id, movieGenres.movieId))
        .leftJoin(genres, eq(movieGenres.genreId, genres.id))
        .where(eq(movies.id, movieId));

        if (!results || results.length === 0) return null;

        const movie = results[0] = {
            id: results[0].id,
            title: results[0].title,
            ageRating: results[0].ageRating || 'N/A',
            poster: results[0].poster || '/placeholder.jpg',
            description: results[0].description || 'No description available.',
            ratingScore: results[0].ratingScore ?? null,
            genre: []
        };

        for (const row of results)
        {
            if (row.genre && !movie.genre.includes(row.genre))
                { movie.genre.push(row.genre); }
        }

        return movie;
    }
}