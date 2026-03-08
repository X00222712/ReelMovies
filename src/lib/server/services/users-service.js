import { undefined } from 'zod'
import { usersDataAccess } from '../data-access/users-data-access.js'
// Utils
import { NotFoundError, ValidationError } from '../utils/errors.js'
import { genCookieUserSession } from '../utils/secure-number.js'
    // Validation

export const usersService = {
    async getUserDetails(userCookie)
    {
        if (null === userCookie || "null" == userCookie)
            { return { username : "Guest", RMPoints : 0, signout : true} }
        // Validation
        if ('string' === typeof userCookie && userCookie.length == 40)
        {
            const userData = await usersDataAccess.getUserDetails(userCookie);
            if (!userData) { return { username : "Guest", RMPoints : 0, signout : true}; }
            userData.signout = false;
            return userData
        }
        else
            {throw new ValidationError(`Param was not valid cookie was ${typeof userCookie}`); }
    },

    async signinUser(username, userpassword)
    {
        const userId = await usersDataAccess.getUserIdFromName(username);
        if (-1 === userId)
        { return "NO SIGNIN" }
        const userPas = await usersDataAccess.getUserPasswordFromId(userId);
        if (-1 === userPas)
        { return "NO SIGNIN" }

        // New user token
        if (userpassword === userPas)
        {
            const shaCookie = await genCookieUserSession(username, userpassword)
            // Session Already Found
            if(!await usersDataAccess.startNewUserSession(userId, shaCookie))
                {
                    console.log("3")
                    await usersDataAccess.endUserSessionIds(userId);;
                    // Session Already Found ABORT
                    if(!await usersDataAccess.startNewUserSession(userId, shaCookie))
                        { return "SAF"; }
                }
            return shaCookie;
        }
        return "NO SIGNIN";
    },

    async signoutUser(userCookie)
        { await usersDataAccess.endUserSession(userCookie); },


    async addUser(username, password)
    {
        // Validated username and password
        // TODO
        if(await usersDataAccess.userRegistered(username))
            { return "TAKEN" }
        await usersDataAccess.addUser(username, password);
        return "OK"
    }
}