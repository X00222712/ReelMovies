// Third part
import { NotFoundError, ValidationError, AlreadyExists } from '../utils/errors.js'
// Ours
import { usersDataAccess } from '../data-access/users-data-access.js'
import { idSchema } from '../db/validation.js'

export const usersService = {
    async getUserPoints(userID)
    {
        const validated = idSchema.parse({id : userID})
        return await usersDataAccess.getUserPoints(validated)
    },
    async insertUserPoints(userID)
    {
        const validated = idSchema.parse({id : userID})
        return await usersDataAccess.insertUserPoints(validated.id)
    },

    async getUser(userID)
    {
        const validated = idSchema.parse({id : userID})
        const data = await usersDataAccess.getUser(validated)
        console.log("DATA", data)
        return
    }
}