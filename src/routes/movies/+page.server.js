import { moviesService } from "$lib/server/services/movie-service";

export async function load( { cookie } ) {
    const movies = await moviesService.getAllMovies();
    return { movies : movies }
}