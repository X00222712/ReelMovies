import { moviesService } from "$lib/server/services/movie-service"
import { json } from "@sveltejs/kit"

export async function POST( { cookie, request } )
{
    const reqContent = await request.json();
    let content = {};
    let status = 404;

    if ("recommened movies" === reqContent.info)
        {
            status = 200
            let movies = await moviesService.getAllMovies();
            movies = movies.filter((movie, i) => { return i < 5; })
            movies.forEach( (movie, i) => {
                movie.active = i === 0
            });

            content = {movies : movies}
        }

    return json(content, { status : status});
}