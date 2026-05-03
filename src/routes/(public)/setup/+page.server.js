/*

Author : Alex D & Glen Johnston
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
import {admins, genres, movieGenres, movies, rewardPoints, screens, screenings, loyaltyRewards} from '$lib/server/db/schema';

import { usersService } from '$lib/server/services/users-service';
import { bookingService } from '$lib/server/services/booking-service';
import { tr } from 'zod/v4/locales';

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

const screenData = [
	[1, 'Screen 1', 'SSSSSDDDD|SSSSSSSSS|RRRRRRRRR|VVVVVVVVV|RRRRRRRRR'],
	[2, 'Screen 2', 'SSSSSDDDD|SSSSSSSSS|RRRRRRRRR|VVVVVVVVV|VVVVVVVVV'],
	[3, 'Screen 3', 'SSSSSSSS|RRRRRRRR|RRRRRRRR|VVVVVVVV'],
	[4, 'Screen 4', 'SSSSSSDD|SSSSSSSS|RRRRRRRR|RRRRRRRR|VVVVVVVV'],
	[5, 'Screen 5', 'SSSSSSSSSS|RRRRRRRRRR|RRRRRRRRRR|VVVVVVVVVV'],
	[6, 'Screen 6', 'SSSSDD|SSSSSS|RRRRRR|VVVVVV']
];

async function makeScreens() {
	try {
		for (const screen of screenData) {
			await db.insert(screens).values({
				id: screen[0],
				name: screen[1],
				seats: screen[2]
			});
		}

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}
const screeningData = [
	[1, 1, 1, '2026-05-24', '10:00 AM'],
	[2, 1, 4, '2026-05-24', '7:30 PM'],
	[3, 2, 2, '2026-05-24', '11:30 AM'],
	[4, 2, 5, '2026-05-24', '8:15 PM'],
	[5, 3, 3, '2026-05-24', '1:00 PM'],
	[6, 3, 6, '2026-05-24', '9:00 PM'],
	[7, 4, 1, '2026-05-25', '10:45 AM'],
	[8, 4, 5, '2026-05-25', '7:45 PM'],
	[9, 5, 2, '2026-05-25', '12:00 PM'],
	[10, 5, 4, '2026-05-25', '8:30 PM'],
	[11, 6, 3, '2026-05-25', '1:30 PM'],
	[12, 6, 6, '2026-05-25', '9:15 PM'],
	[13, 7, 1, '2026-05-26', '11:00 AM'],
	[14, 7, 4, '2026-05-26', '8:00 PM'],
	[15, 8, 2, '2026-05-26', '12:30 PM'],
	[16, 8, 5, '2026-05-26', '6:45 PM'],
	[17, 9, 3, '2026-05-26', '2:00 PM'],
	[18, 9, 6, '2026-05-26', '9:30 PM'],
	[19, 10, 1, '2026-05-27', '10:15 AM'],
	[20, 10, 5, '2026-05-27', '8:20 PM'],
	[21, 11, 2, '2026-05-27', '11:45 AM'],
	[22, 11, 6, '2026-05-27', '4:30 PM'],
	[23, 12, 3, '2026-05-27', '1:15 PM'],
	[24, 12, 4, '2026-05-27', '7:00 PM'],
	[25, 13, 1, '2026-05-28', '10:30 AM'],
	[26, 13, 6, '2026-05-28', '5:00 PM'],
	[27, 14, 2, '2026-05-28', '12:15 PM'],
	[28, 14, 5, '2026-05-28', '6:30 PM'],
	[29, 15, 3, '2026-05-28', '2:15 PM'],
	[30, 15, 4, '2026-05-28', '7:45 PM'],
	[31, 16, 1, '2026-05-29', '11:15 AM'],
	[32, 16, 6, '2026-05-29', '3:45 PM'],
	[33, 17, 2, '2026-05-29', '1:00 PM'],
	[34, 17, 5, '2026-05-29', '8:00 PM'],
	[35, 18, 3, '2026-05-29', '5:30 PM'],
	[36, 18, 4, '2026-05-29', '9:15 PM'],
	[37, 19, 1, '2026-05-30', '6:00 PM'],
	[38, 19, 5, '2026-05-30', '9:00 PM'],
	[39, 20, 2, '2026-05-30', '5:15 PM'],
	[40, 20, 6, '2026-05-30', '8:45 PM'],
	[41, 21, 3, '2026-05-30', '4:45 PM'],
	[42, 21, 4, '2026-05-30', '8:30 PM'],
	[43, 22, 1, '2026-06-01', '12:00 PM'],
	[44, 22, 5, '2026-06-01', '7:30 PM'],
	[45, 23, 2, '2026-06-01', '1:30 PM'],
	[46, 23, 6, '2026-06-01', '8:15 PM'],
	[47, 24, 3, '2026-06-01', '11:00 AM'],
	[48, 24, 4, '2026-06-01', '5:30 PM'],
	[49, 25, 1, '2026-06-02', '12:45 PM'],
	[50, 25, 5, '2026-06-02', '8:45 PM'],
	[51, 26, 2, '2026-06-02', '2:15 PM'],
	[52, 26, 6, '2026-06-02', '7:15 PM'],
	[53, 27, 3, '2026-06-02', '3:30 PM'],
	[54, 27, 4, '2026-06-02', '9:00 PM']
];

async function makeScreenings() {
	try {
		for (const screening of screeningData) {
			await db.insert(screenings).values({
				id: screening[0],
				movieId: screening[1],
				screenId: screening[2],
				date: screening[3],
				time: screening[4]
			});
		}

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

const loyaltyRewardData = [
	[1, 'Small Popcorn', 'Free small popcorn with your next movie.', 150, 'foods/popcorn.png'],
	[2, 'Fanta', 'Free Fanta drink.', 100, 'drinks/fanta.png'],
	[3, 'Coca Cola', 'Free Coca Cola drink.', 100, 'drinks/coca_cola.png'],
	[4, 'Free Standard Seat Upgrade', 'Upgrade one saver seat to regular.', 700, null],
	[5, 'VIP Seat Discount', 'Get a discount on a VIP seat.', 1000, null]
];

async function makeLoyaltyRewards() {
	try {
		for (const reward of loyaltyRewardData) {
			await db.insert(loyaltyRewards).values({
				id: reward[0],
				name: reward[1],
				description: reward[2],
				pointsCost: reward[3],
				image: reward[4]
			});
		}

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

const bookTickets = [
    [ 4, 1, [ [0,1], [0,2], [0,3] ], "card", 0, 17.67 ],
    [ 4, 3, [ [3,0], [3,1], [3,2], [3,3], [3,4], [3,5] ], "card", 44.61, 59.49 ],

    [ 3, 24, [ [0,6], [0,5], [2,7] ], "card", 2, 19.97 ],
    [ 2, 16, [ [2,9], [2,7], [2,8], [2,6], [2,5] ], "cash", 0, 39.95 ]
]

async function makeBookings() {
    for (const booking of bookTickets)
    {
        const userId = booking[0]
        const screeningId = booking[1]
        const seats = booking[2]
        const paymentMethod = booking[3]
        const discount = booking[4]
        const price = booking[5]

        await bookingService.bookTickets(
            {
                userId,
                screeningId,
                seats,
                paymentMethod,
                discount,
                price
            }
        )   
    }
    return tr
}

export const actions = {
	default : async ({ request, cookies }) =>
    {
        const data = await request.formData();
        const password = data.get("password")
        // Temp password
        if ("RM" !== password) { return fail(424, {failed: true, message : "Password incorrect"}) }

        // This will always fail if setup is run more than once
        if (!(await makeAccounts(cookies)))
            { return fail(400, {failed: true, message : "Failed to create accounts" }) }

        if (!(await makeGenres()))
            { return fail(400, {failed: true, message : "Failed to create genres" }) }

        if (!(await makeMovies()))
            { return fail(400, {failed: true, message : "Failed to create movies" }) }

        if (!(await makeMovieGenres()))
            { return fail(400, {failed: true, message : "Failed to link movies and genres" }) }

        if (!(await makeScreens()))
            { return fail(400, { failed: true, message: "Failed to create screens" }) }

        if (!(await makeScreenings()))
            { return fail(400, { failed: true, message: "Failed to create screenings" }) }

        if (!(await makeLoyaltyRewards()))
            { return fail(400, { failed: true, message: "Failed to create loyalty rewards" }) }

        if(!(await makeBookings()))
            { return fail(400, { failed: true, message: "Failed to create bookings rewards" }) }

        return { failed: false, message : "DB setup" }
	} 
}


