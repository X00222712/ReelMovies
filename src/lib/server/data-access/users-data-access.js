import { eq } from "drizzle-orm";
import { user } from "../db/auth.schema";
import { db } from "../db/index"
import { rewardPoints } from "../db/schema";

// This was done in the svelte labs
// The name does not matter all that does
// Is that the data is put into here
const rewardPointsData = {
    userId : rewardPoints.userId,
    points : rewardPoints.points
}

export const usersDataAccess = {
    async getUserPoints(userID)
    {
        const result = await db.select(rewardPointsData).from(rewardPoints).where(eq(userID.id, rewardPoints.userId)).limit(1)
        return result[0] ?? null
    },
    async insertUserPoints(userID)
    {
        await db.insert(rewardPoints).values({userId : userID})
    }
};