import { eq, gte } from "drizzle-orm"
import { db } from "../db"
import { feedback, user } from "../db/schema"

const feedbackData = {
    id : feedback.id,
    userId : feedback.userId,
    rating : feedback.rating,
    review : feedback.review,
    username : user.name
}

export const feedbackDataAccess = {
    async addFeedback( userId, rating, review )
        {
            console.log(userId, rating, review)
            await db.insert(feedback)
                .values( { userId, rating, review} )
        },

    async getTopFeedback()
    {
        const result = await db.select(feedbackData)
        .from(feedback)
        .where( gte( feedback.rating, 4 ) )
        .innerJoin(user, eq(feedback.userId, user.id))
        .limit(4)
        return result.reverse()
    },

    
    async getAllFeedback()
    {
        const result = await db.select(feedbackData)
            .from(feedback)
            .innerJoin(user, eq(feedback.userId, user.id))
            .limit(15)
        return result.reverse()
    },
}