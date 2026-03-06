import { recommendedMovieDataAccess } from '../data-access/recommended-movie-data-access.js'
import { NotFoundError } from '../utils/errors.js'
// Validation

export const recommendedMoviesService = {
    async getRecommendedMovies() {
        const movies = await recommendedMovieDataAccess.getRecommendedMovies();
        if (!movies) throw new NotFoundError('Could not find recommended movies');
        return movies;
    }
};