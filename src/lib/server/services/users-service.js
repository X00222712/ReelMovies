// Third part
import { NotFoundError, ValidationError, AlreadyExists } from '../utils/errors.js'
// Ours
import { usersDataAccess } from '../data-access/users-data-access.js'
import { idSchema } from '../db/validation.js'

export const usersService = {

    async deleteAccount(userId, password, session)
    {
        await usersDataAccess.deleteAccount(userId)
    },

    async getUserPoints(userID)
    {
        const validated = idSchema.parse({id : userID})
        return await usersDataAccess.getUserPoints(validated)
    },
    async insertUserPoints(userID, points = 0)
    {
        const validatedId = idSchema.parse({id : userID})
        const validatedPoints = idSchema.parse({id : points})
        return await usersDataAccess.insertUserPoints(validatedId.id, validatedPoints.id)
    },

    async getUser(userID)
    {
        const validated = idSchema.parse({id : userID})
        return await usersDataAccess.getUser(validated)
    },


    async getUserByEmail(userEmail)
    {
        return await usersDataAccess.getUserByEmail(userEmail)
    },

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

    async Insertadmins(userId, admin, priv)
        { await usersDataAccess.Insertadmins(userId, admin, priv) },

    async setAdmin(userId)
        { await usersDataAccess.setAdmin(userId) },

    async setprivilage(userId)
        { await usersDataAccess.setPrivilage(userId) },

    async removeAdmin(userId)
        { await usersDataAccess.removeAdmin(userId) },

    async setprivilage(userId)
        { await usersDataAccess.removePrivilage(userId) },


}