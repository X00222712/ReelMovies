// Third part
import { NotFoundError, ValidationError, AlreadyExists } from '../utils/errors.js'
// Ours
import { usersDataAccess } from '../data-access/users-data-access.js'
import { idSchema, validateUserPassword } from '../db/validation.js'
import { auth } from '../auth.js'
import { db } from '../db/index.js'
import { session } from '../db/auth.schema.js'

export const usersService = {
// CREATE
    async insertUserPoints(userID, points = 0)
    {
        const validatedId = idSchema.parse({id : userID})
        const validatedPoints = idSchema.parse({id : points})
        return await usersDataAccess.insertUserPoints(validatedId.id, validatedPoints.id)
    },

    async Insertadmins(userId, admin, priv)
        { await usersDataAccess.Insertadmins(userId, admin, priv) },

// UPDATE
    async updateRMpoints(userId, rmPoints)
        { await usersDataAccess.updateRMpoints(userId, rmPoints) },

    async setAdmin(userId)
        { await usersDataAccess.setAdmin(userId) },

    async setPrivilage(userId)
        { await usersDataAccess.setPrivilage(userId) },

    async removeAdmin(userId)
        { await usersDataAccess.removeAdmin(userId) },

    async removePrivilage(userId)
        { await usersDataAccess.removePrivilage(userId) },

// READ
    async getUserPoints(userID)
    {
        const validated = idSchema.parse({id : userID})
        return await usersDataAccess.getUserPoints(validated)
    },

    async getUser(userID)
    {
        const validated = idSchema.parse({id : userID})
        return await usersDataAccess.getUser(validated)
    },

    async getUserByEmail(userEmail)
        { return await usersDataAccess.getUserByEmail(userEmail) },

    async getUsersPageByID(userID, pagesize)
    {
        const validatedId = idSchema.parse({id : userID})
        // Must be fix the same validation check as ID
        const validatedPageSize = idSchema.parse({id : pagesize})
        // const validatedPageSize = pageSize
        return await usersDataAccess.getUsersPageByID(validatedId.id, validatedPageSize.id)
    },

    // Used in paging
    async getLastPage(pagesize) {
        return await usersDataAccess.getLastPage(pagesize)
    },

    async canAccessAdmin(userId)
        { return await usersDataAccess.canAccessAdmin(userId) },

// DELETE
    // Check the admin password HERE to make it harder to mess up
    // Verify they are priv & password it corrected
    async deleteAccount(userId, session, adminPassword)
    {
        const user = await usersDataAccess.getUserOfSession(session);
        const validatedpw = await validateUserPassword.parse( { password : adminPassword } ).password

        if (await auth.api.verifyPassword({
            body : { password : validatedpw },
            headers : { cookie : `better-auth.session_token=${session}` }
        })) { await usersDataAccess.deleteAccount(userId) }
    },

    // Deletes all user data that isn't the account etc
    async deleteUserData(userId, session, adminPassword)
    {
        const user = await usersDataAccess.getUserOfSession(session);
        const validatedpw = await validateUserPassword.parse( { password : adminPassword } ).password

        if (await auth.api.verifyPassword({
            body : { password : validatedpw },
            headers : { cookie : `better-auth.session_token=${session}` }
        })) { await usersDataAccess.deleteUserData(userId) }
    },
}