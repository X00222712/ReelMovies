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
    ratingScore : movies.ratingScore
}

export const moviesDataAccess = {
    async getMovieById(movieId) {
        const results = await db.select(movieInfo)
        .from(movies)
        .where(eq(movieId, movies.id))

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

        const MovieGenres = await db.select( {genre : genres.name } )
        .from(movieGenres)
        .where(eq(movieGenres.movieId, movie.id))
        .innerJoin(genres, eq( genres.id, movieGenres.genreId ))

        for (const row of MovieGenres)
        {
            movie.genre.push(row.genre)
        }
        console.log(movie.genre)

        return movie;
    }
}