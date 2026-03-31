/*
Author : Glen Johnston
Created : Feb / 2026

Description

All user data access other than better auth stuff
*/

// Third party
import { eq, gte, sql, desc, inArray } from "drizzle-orm";
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
    RMPoints : rewardPoints.points,
    admin : admins.admin,
    privilage : admins.privilage
}

export const usersDataAccess = {
    async getUserPoints(userID)
    {
        const result = await db.select(rewardPointsData).from(rewardPoints).where(eq(userID.id, rewardPoints.userId)).limit(1)
        return result[0] ?? null
    },

    async insertUserPoints(userID, points)
        { await db.insert(rewardPoints).values({userId : userID, points : points}) },

    async getUser(userID)
    {
        const result = await db.select(userData).from(user)
        .leftJoin( admins, eq(user.id, admins.id) )
        .leftJoin( rewardPoints , eq(user.id, rewardPoints.userId) )
        .where(eq(userID.id, user.id)).limit(1)
        return result[0] ?? null
    },

    async getUsersPageByID(userID, pagesize)
    {
        const result = await db.select(userData).from(user)
        .leftJoin( admins, eq(user.id, admins.id) )
        .leftJoin( rewardPoints , eq(user.id, rewardPoints.userId) )
        .where(gte(user.id, userID)).limit(pagesize)
        return result
    },

    async getLastPage(pagesize)
    {
        const result = await db.select(userData).from(user)
        .leftJoin( admins, eq(user.id, admins.id) )
        .leftJoin( rewardPoints , eq(user.id, rewardPoints.userId) )
        .orderBy( desc(user.id) )
        // https://github.com/drizzle-team/drizzle-orm/discussions/457
        .limit(pagesize)
        // reverse the reversed page
        return result.reverse()
    }
};