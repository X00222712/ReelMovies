import { undefined } from 'zod'
import { usersDataAccess } from '../data-access/users-data-access.js'
// Utils
import { NotFoundError, ValidationError, AlreadyExists } from '../utils/errors.js'
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
        { throw new NotFoundError("Username or password wrong") }
        const userPas = await usersDataAccess.getUserPasswordFromId(userId);
        if (-1 === userPas)
        { throw new NotFoundError("Username or password wrong") }

    },

    async signoutUser(userCookie)
        { await usersDataAccess.endUserSession(userCookie); },


    async addUser(username, password)
    {
        // Validated username and password
        // TODO
        if(await usersDataAccess.userRegistered(username))
            { throw new AlreadyExists("Username Already exits")}
        await usersDataAccess.addUser(username, password);
    }
}