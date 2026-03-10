import { moviesService } from "$lib/server/services/movie-service";

export async function load( { cookie } ) {
    const movies = await moviesService.getAllMovies();
    const times = {
        "Interstellar" : [
            {
                screen: "screen 1",
                time: "9 AM"
            },
            {
                screen: "screen 2",
                time: "11:15 AM"
            }
        ],
        "The Batman" : [
            {
                screen: "screen 2",
                time: "9 AM"
            },
            {
                screen: "screen 2",
                time: "13:15 PM"
            }
        ],
        "Coco" : [
            {
                screen: "screen 1",
                time: "11:15 AM"
            },
            {
                screen: "screen 2",
                time: "19:30 PM"
            }
        ]
    };
    const screens = {
        "screen 1" : {
            seats : [
                "SSSSSDDDD",
                "SSSSSSSSS",
                "RRRRRRRRR",
                "VVVVVVVVV",
                "RRRRRRRRR"
            ],
            taken : [
                "0,7",
                "0,8",
                "1,1",
                "1,2",
                "1,4",
                "1,5",
                "1,8",
                "3,3",
                "4,7",
            ]
        },
        "screen 2" : {
            seats : [
                "SSSSSDDDD",
                "SSSSSSSSS",
                "RRRRRRRRR",
                "VVVVVVVVV",
                "VVVVVVVVV"
            ],
            taken : [
                "0,7",
                "0,8",
                "1,1",
                "1,2",
                "1,4",
                "1,5",
                "1,8",
                "3,3",
                "4,7",
            ]
        }
    }
    return { movies : movies, movieTimes : times, screens : screens}
}