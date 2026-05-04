/*
Author : Glen Johnston
Created : Feb / 2026

Description

All user data access other than better auth stuff
*/

// Third party
import { eq, gte, sql, desc, inArray } from "drizzle-orm";
import { db } from "../db/index"
import { user, session, account } from "../db/auth.schema";

// Ours
import { admins, rewardPoints } from "../db/schema";
import { date } from "drizzle-orm/mysql-core";


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
// CREATE

// UPDATE
    async updateRMpoints(userId, rmPoints)
    {
        await db.update(rewardPoints)
        .set({points : rmPoints })
        .where( eq(userId, rewardPoints.userId) )
    },
// READ
// DELETE

    async getUserPoints(userID)
    {
        const result = await db.select(rewardPointsData).from(rewardPoints).where(eq(userID.id, rewardPoints.userId)).limit(1)
        return result[0] ?? null
    },

    async insertUserPoints(userID, points)
        { await db.insert(rewardPoints).values({userId : userID, points : points}) },

    async getUserOfSession(userSession)
    {
        const result = await db
        .select( { id : session.userId } )
        .from( session )
        .where( eq(userSession, session.token) )
        .limit(1)

        return result[0]
    },

    async getUser(userID)
    {
        const result = await db.select(userData).from(user)
        .leftJoin( admins, eq(user.id, admins.userId) )
        .leftJoin( rewardPoints , eq(user.id, rewardPoints.userId) )
        .where(eq(userID.id, user.id)).limit(1)
        return result[0] ?? null
    },

    async getUserByEmail(userEmail)
    {
        const result = await db.select( { id : user.id } )
        .from(user)
        .where( eq(userEmail, user.email) )
        .limit(1)

        return result[0]
    },

    async getUsersPageByID(userID, pagesize)
    {
        const result = await db.select(userData).from(user)
        .leftJoin( admins, eq(user.id, admins.userId) )
        .leftJoin( rewardPoints , eq(user.id, rewardPoints.userId) )
        .where(gte(user.id, userID)).limit(pagesize)
        return result
    },

    async getLastPage(pagesize)
    {
        const result = await db.select(userData).from(user)
        .leftJoin( admins, eq(user.id, admins.userId) )
        .leftJoin( rewardPoints , eq(user.id, rewardPoints.userId) )
        .orderBy( desc(user.id) )
        // https://github.com/drizzle-team/drizzle-orm/discussions/457
        .limit(pagesize)
        // reverse the reversed page
        return result.reverse()
    },

    async canAccessAdmin(userId)
    {
        const result = await db
            .select( { admin : admins.admin, privilage : admins.privilage } )
            .from( admins )
            .where( eq(userId, admins.userId) )
            .limit(1)
        return result[0];
    },

    async Insertadmins(userId, admin, priv)
        {
            await db.insert(admins)
            .values({
                userId : userId,
                admin : admin,
                privilage : priv
            })
        },

    async setAdmin(userId)
        {
            await db.update(admins)
            .set({ admin : true })
            .where( eq(userId, admins.userId) )
        },

    async setPrivilage(userId)
        {
            await db.update(admins)
            .set({ admin : true, privilage : true })
            .where( eq(userId, admins.userId) )
        },

        async removeAdmin(userId)
        {
            await db.update(admins)
            .set({ admin : false, privilage : false })
            .where( eq(userId, admins.userId) )
        },

    async removePrivilage(userId)
        {
            await db.update(admins)
            .set({ privilage : false })
            .where( eq(userId, admins.userId) )
        },

    // go through better auth tables and delete everything
    async deleteAccount(userId)
    {
        console.log(userId)
        await db
        .delete(account)
        .where( eq(userId, account.id) )

        await db
        .delete(session)
        .where( eq(userId, session.id) )

        await db
        .delete(user)
        .where( eq(userId, user.id) )
    },

    // go throught our tables and delete everything
    async deleteUserData(userId)
    {
        console.log("delete user data")
        // Delete admin accounts
        await db
        .delete(admins)
        .where( eq(userId, admins.userId) )

        // Delete RM points
        await db
        .delete(rewardPoints)
        .where( eq(userId, rewardPoints.userId) )
    },
};