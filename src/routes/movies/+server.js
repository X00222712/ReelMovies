import { moviesService } from "$lib/server/services/movie-service"
import { json } from "@sveltejs/kit"

export async function POST( { cookie, request } )
{
    const movies = await moviesService.getAllMovies();
    return json({movies : movies}, { status : 200});
}