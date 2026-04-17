/*

Author : Glen Johnston
Create : 17 / Mar / 2026

Description

This file is to setup the DB and any setup value's for testing should be initislied in here
either by using proper channels or be checking that all the code works and can not fail.

*/

// Third part
import { db } from '$lib/server/db';
import { auth } from '$lib/server/auth';
import { fail, json, redirect } from '@sveltejs/kit';

// Ours
import { admins, genres, movieGenres, movies, rewardPoints } from '$lib/server/db/schema';
import { usersService } from '$lib/server/services/users-service';

export async function load( { locals } )
{
    if (locals.user?.name)
        { redirect(307, "/account") }
}

const usersInformation = [
    // Username, email, password, RMpoints, [admin, privilage]
    ["IT Admin", 'itsuper@reelmovies.ie', "ITSupport", 100000, [1, 1]],
    ["Admin", 'admin@reelmovies.ie', "reelmovies", 0, [1, 0]],
    ["Glen", 'test@test.ie', "password123", 200, [0, 0]],
    ["Alex", 'Alex@test.ie', "SuperCool", 400, [0, 0]],
    ["Glen", 'glen@test.ie', "password123", 0, [0, 0]],
    ["Glen", 'GLEN@test.com', "password123", 0, [0, 0]],
]

async function makeAccounts(cookies)
{
	let userSigninCookie = cookies.get("better-auth.session_token")
    try {

        usersInformation.forEach(async (element, index) => {
            console.log(index, element)

            const newUser = await auth.api.signUpEmail({
                body : {
                    name : element[0],
                    email : element[1],
                    password : element[2]
                }
            })

            const userId = newUser.user.id

            await usersService.insertUserPoints(Number(userId), element[3])

            if (element[4][0])
            { await db.insert(admins).values({userId, admin: element[4][0], privilage: element[4][1]}) }

            // Signout
            await auth.api.signOut({
                headers : { cookies : `better-auth.session_token=${newUser.token}` }
            })

        });


        cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
        return true
    } catch (error)
    {
        console.log(error)
        cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
        return false
    }
}

const genreData = [
    'Action',
    'Adventure',
    'Anime',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Historical',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'Parody',
    'Psychological',
    'Romance',
    'Satire',
    'Sci-Fi',
    'Sport',
    'Superhero',
    'Thriller',
    'War',
    'Western'
]

async function makeGenres()
{
    try
    {
        genreData.forEach(async (element) => {
            await db.insert(genres).values({
                name : element
            }) 
        });
        return true
    }
    catch (error)
    {
        console.log(error)
        return false
    }
}

const movieData = [
    ['The Shawshank Redemption', 'R', 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 9.3, 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'],
    ['The Godfather', 'R', 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', 9.2, 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'],
    ['The Dark Knight', 'PG-13', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 9.0, 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'],
    ['Pulp Fiction', 'R', 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 8.9, 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'],
    ['The Lord of the Rings: The Return of the King', 'PG-13', 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', 8.9, 'The final confrontation for Middle-earth begins as Frodo and Sam approach Mount Doom and Aragorn leads the forces of men against Sauron.'],
    ['Inception', 'PG-13', 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 8.8, 'A skilled thief infiltrates people\'s dreams to steal secrets and is tasked with planting an idea into the mind of a CEO.'],
    ['Fight Club', 'R', 'https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg', 8.8, 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.'],
    ['Forrest Gump', 'PG-13', 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', 8.8, 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.'],
    ['The Matrix', 'R', 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', 8.7, 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'],
    ['The Silence of the Lambs', 'R', 'https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg', 8.6, 'An FBI trainee seeks the help of imprisoned cannibal Dr. Hannibal Lecter to catch a serial killer.'],
    ['My Neighbor Totoro', 'G', 'https://image.tmdb.org/t/p/w500/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg', 8.2, 'Two young sisters befriend gentle forest spirits in rural Japan and discover the wonders of childhood imagination.'],
    ['Spirited Away', 'PG', 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg', 8.6, 'A young girl enters a mysterious spirit world and must find the courage to save her parents and herself.'],
    ['The Lion King', 'G', 'https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg', 8.5, 'A young lion prince flees his kingdom after the death of his father, only to learn the true meaning of responsibility and bravery.'],
    ['Toy Story', 'G', 'https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg', 8.3, 'Toys come to life when humans are not around; an anxious cowboy and a brash spaceman must learn to work together.'],
    ['Finding Nemo', 'G', 'https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg', 8.1, 'After his son is captured in the Great Barrier Reef, a timid clownfish sets out on a journey to bring him home.'],
    ['The Pokemon Movie: I Choose You!', 'PG', 'https://image.tmdb.org/t/p/w500/jNgGZBeqmdg9dU8qYhUqXHhE9tV.jpg', 6.5, 'A retelling of Ash Ketchums early adventures as he meets Pikachu and sets off to become a Pokemon master.'],
    ['Your Name', 'PG', 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg', 8.4, 'Two teenagers mysteriously begin to swap bodies and form a deep connection as they try to solve the mystery connecting them.'],
    ['Art of the Devil', 'R', 'https://image.tmdb.org/t/p/w500/uS9m8OBk1b6QGMzYHn3q2G9KJmK.jpg', 6.1, 'A dark Thai horror story about the consequences of revenge and black magic.'],
    ['The Exorcist', 'R', 'https://image.tmdb.org/t/p/w500/4ucLGcXVVSVnsfkGtbLY4XAius8.jpg', 8.0, 'A mother seeks demonic help when her daughter becomes possessed, leading to one of the most famous exorcisms in film history.'],
    ['The Conjuring', 'R', 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg', 7.5, 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.'],
    ['The Wolf of Wall Street', 'R', 'https://image.tmdb.org/t/p/w500/kW9LmvYHAaS9iA0tHmZVq8hQYoq.jpg', 8.2, 'The rise and fall of stockbroker Jordan Belfort, a wild tale of greed, excess, and excess.'],
    ['Interstellar', 'PG-13', 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', 8.6, 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'],
    ['The Batman', 'PG-13', 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', 7.9, 'A detective-driven take on Batman as he uncovers corruption in Gotham and faces a sadistic killer known as the Riddler.'],
    ['Coco', 'PG', 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg', 8.4, 'A young boy who dreams of becoming a musician finds himself in the Land of the Dead and learns the importance of family.'],
    ['Avengers: Endgame', 'PG-13', 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', 8.4, 'The Avengers assemble once more to undo the damage caused by Thanos and restore the universe.'],
    ['Black Panther', 'PG-13', 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg', 7.3, 'T\'Challa returns home to the African nation of Wakanda to take his rightful place as king and face a powerful enemy.'],
    ['Guardians of the Galaxy', 'PG-13', 'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg', 8.0, 'A band of misfits must work together to protect a mysterious orb and save the galaxy.']
]

async function makeMovies() {
    try
    {
        movieData.forEach(async (element) => {
            await db.insert(movies).values({
                title : element[0],
                rating : element[1],
                poster : element[2],
                ratingScore : element[3],
                description : element[4]
            })
        });
        return true
    }
    catch (error)
    {
        console.log(error)
        return false
    }
}

const movieGenreLink = [
    [1  , 9],
    [2  , 9],
    [3  , 1],
    [3  , 24],
    [4  , 7],
    [4  , 9],
    [5  , 2],
    [5  , 11],
    [6  , 21],
    [6  , 24],
    [7  , 9],
    [7  , 24],
    [8  , 9],
    [8  , 19],
    [9  , 21],
    [9  , 1],
    [10 , 24],
    [10 , 7],
    [11 , 4],
    [11 , 10],
    [12 , 4],
    [12 , 11],
    [13 , 4],
    [13 , 9],
    [14 , 4],
    [14 , 10],
    [15 , 4],
    [15 , 2],
    [16 , 4],
    [16 , 2],
    [17 , 4],
    [17 , 19],
    [18 , 13],
    [18 , 24],
    [19 , 13],
    [19 , 24],
    [20 , 13],
    [20 , 24],
    [21 , 9],
    [21 , 5],
    [22 , 21],
    [22 , 2],
    [23 , 1],
    [23 , 7],
    [24 , 4],
    [24 , 10],
    [25 , 1],
    [25 , 2],
    [26 , 1],
    [26 , 2],
    [27 , 1],
    [27 , 2]
]

async function makeMovieGenres() {
    try
    {
        movieGenreLink.forEach(async (element) => {
            await db.insert(movieGenres).values({
                movieId : element[0],
                genreId : element[1]
            })
        });
        return true
    }
    catch (error)
    {
        console.log(error)
        return false
    }
}


export const actions = {
	default : async ({ request, cookies }) =>
    {
        const data = await request.formData();
        const password = data.get("password")
        // Temp password
        if ("RM" !== password) { return fail(401, {failed: true, message : "Password incorrect"}) }

        if (!(await makeAccounts(cookies)))
            { return fail(400, {failed: true, message : "Failed to create accounts" }) }

        if (!(await makeGenres()))
            { return fail(400, {failed: true, message : "Failed to create genres" }) }

        if (!(await makeMovies()))
            { return fail(400, {failed: true, message : "Failed to create movies" }) }

        if (!(await makeMovieGenres()))
            { return fail(400, {failed: true, message : "Failed to link movies and genres" }) }

        return { failed: false, message : "DB setup" }
	} 
}