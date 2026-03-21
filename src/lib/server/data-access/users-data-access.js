// Third party
import { eq } from "drizzle-orm";
import { db } from "../db/index"
import { user } from "../db/auth.schema";

// Ours
import { admins, rewardPoints } from "../db/schema";


// This was done in the svelte labs
// The name does not matter all that does
// Is that the data is put into here
const rewardPointsData = {
    userId : rewardPoints.userId,
    points : rewardPoints.points
}

const userData = {
    id : user.id,
    name : user.name,
    email : user.email,
    admin : admins.admin,
    privilage : admins.privilage
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
    },
    async getUser(userID)
    {
        const result = await db.select(userData).from(user)
        .leftJoin( admins, eq(user.id, admins.id) )
        .where(eq(userID.id, user.id)).limit(1)
        return result[0] ?? null
    }
};