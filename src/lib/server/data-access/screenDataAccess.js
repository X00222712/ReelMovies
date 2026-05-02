import { eq } from "drizzle-orm"
import { db } from '$lib/server/db'
import { movies, screens, screenings, bookings } from '$lib/server/db/schema';

const screenInfo = {
    id : screenings.id,
    movieId : screenings.movieId,
    screenId : screenings.screenId,
    data : screenings.date,
    time : screenings.time,
}

export const screenDataAccess = {

    async getScreeningInfo(screenId)
        {
            const result = await db.select(screenInfo).from(screenings).where( eq(screenId, screenings.id) )
            return result[0]
        },

    async getAllScreening()
    {
        const results = await db.select
            ({
                id: screenings.id,
                date: screenings.date,
                time: screenings.time,
                movieId: movies.id,
                movieTitle: movies.title,
                poster: movies.poster,
                description: movies.description,
                ageRating: movies.rating,
                ratingScore: movies.ratingScore,
                screenId: screens.id,
                screenName: screens.name,
                screenSeats: screens.seats
            })
        .from(screenings)
        .innerJoin(movies, eq(screenings.movieId, movies.id))
        .innerJoin(screens, eq(screenings.screenId, screens.id));
        return results
    }
}