import { undefined } from 'zod'
import { usersDataAccess } from '../data-access/users-data-access.js'
import { NotFoundError, ValidationError } from '../utils/errors.js'
// Validation

import { isStringObject } from 'util/types'


export const usersService = {
    async getUserDetails(user_cookie)
    {
        console.log(user_cookie)
        console.log(typeof user_cookie)
        if (null === user_cookie || "null" == user_cookie)
            { return { username : "Guest", RMPoints : 0} }
        // Validation
        if ('string' === typeof user_cookie && user_cookie.length <= 32)
        {
            const userData = await usersDataAccess.getUserDetails(user_cookie);
            if (!userData) { throw new NotFoundError("Could not find user data"); }
            return userData
        }
        else
            { throw new ValidationError("Param was not valid"); }
    },

    async signinUser(username, userpassword)
    {
        const userId = await usersDataAccess.getUserIdFromName(username);
        const userPas = await usersDataAccess.getUserPasswordFromId(userId);
    }
}