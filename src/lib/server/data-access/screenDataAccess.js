import { eq } from "drizzle-orm"
import { db } from "../db/db"
import { screenings } from "../db/schema"


const screenInfo = {
    movieId : screenings.movieId,
    screenId : screenings.screenId,
    data : screenings.date,
    time : screenings.time,
}

export const screenDataAccess = {

    async getScreeningInfo(screenId)
        { return (await db.select(screenInfo).from(screenings).where( eq(screenId, screenings.id) ))[0] }

}