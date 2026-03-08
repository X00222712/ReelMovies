import { moviesService } from "$lib/server/services/movie-service";

export async function load( { cookie } ) {
    const movies = await moviesService.getAllMovies();
    const times = {
        "Interstellar" : [
            {
                screen: 1,
                time: "9 AM"
            },
            {
                screen: 2,
                time: "11:15 AM"
            }
        ],
        "The Batman" : [
            {
                screen: 2,
                time: "9 AM"
            },
            {
                screen: 2,
                time: "13:15 PM"
            }
        ],
        "Coco" : [
            {
                screen: 1,
                time: "11:15 AM"
            },
            {
                screen: 2,
                time: "19:30 PM"
            }
        ]
    };
    return { movies : movies, movieTimes : times}
}