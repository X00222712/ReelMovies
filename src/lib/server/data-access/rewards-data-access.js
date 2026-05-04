import { eq } from "drizzle-orm"
import { db } from "../db"
import { bookings, loyaltyRewards } from "../db/schema"

const recommendedRewardNames = [
    'Small Popcorn',
    'Fanta',
    'Coca Cola',
]

const rewardInfo = {
    id : loyaltyRewards.id,
    name : loyaltyRewards.name,
    description : loyaltyRewards.description,
    pointsCost : loyaltyRewards.pointsCost,
    image : loyaltyRewards.image
}

export const rewardsDataAccess = {

    async getRewardByName( name )
    {
        const result = await db
            .select(rewardInfo)
            .from(loyaltyRewards)
            .where( eq( name, loyaltyRewards.name ) )
        return result[0]
    },

    async getRecommendedRewards()
        {
            let recommendedRewards = [];
            for (const rewards of recommendedRewardNames)
            {
                const result = await rewardsDataAccess.getRewardByName( rewards )
                recommendedRewards.push( result )
            }
            return recommendedRewards;

        }
}