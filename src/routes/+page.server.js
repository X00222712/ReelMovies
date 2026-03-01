import { recommendedMoviesService } from '$lib/server/services/recmovies-service';

export async function load() {
    const recommendedMovies = await recommendedMoviesService.getRecommendedMovies();
    return { recMovies : recommendedMovies };
}