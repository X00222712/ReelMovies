/*

Author : Glen Johnston
Create : 23 / Mar / 2026

Description

Admin panel functions and data

*/

// Third party
import { auth } from "$lib/server/auth"
import { fail, redirect } from '@sveltejs/kit';

// ours
import { idSchema, validateUser, validateUserEmail } from "$lib/server/db/validation"
import { usersService } from "$lib/server/services/users-service"

export async function load({ locals }) {
    if (!locals.user) { return redirect(302, '/account'); }
    // Validate the user
    let validatedId;
    try
        { validatedId = idSchema.parse({id : Number(locals.user.id)}).id }
    catch (error)
    // This will show an error message,
    // Could do something better but we only need it to work
        {
            console.log(error)
            return { user : {}, failed : {status : true, message : "Could not validate user"} }
        }

    let access;
    try
        { access = await usersService.canAccessAdmin(validatedId) }
    catch (error)
        {
            console.log(error)
            return { user : {}, failed : {status : true, message : "Could not validate user"} }
        }

    console.log(access)
    console.log(1 > access.length)
    if (1 > access.length || false === access?.admin)
        { return redirect(302, '/') }

    // Validate maybe in the future
    const users = await usersService.getUsersPageByID(1, 4)
    return { users, failed : {}}
}

export const actions = {
    async createUser( { request, cookies } ) {
        const data = await request.formData()
        const username = data.get("username")
        const email = data.get("email")
        const password = data.get("password")
        const reelpoints = Number(data.get("RM points")) ?? 0

        const admin = data.get("admin")
        const privilaged = data.get("privilaged")

        // Declare all expected values
        let newUser = {
            error : false,
            message : "Failed due to unknow reasons"
        };

        let validatedUser;
        let ValidatedRMPoints;
        try {
            validatedUser = validateUser.parse({
                name : username,
                email,
                password
            })
            ValidatedRMPoints = idSchema.parse({id : reelpoints})
        }
        catch (error) {
            newUser = {
                error : true,
                message : JSON.parse(error.message)[0].message
            }
            return fail(400, { newUser })
        }

        // The account information is valid
        // Save the current users information
        let userSigninCookie = cookies.get("better-auth.session_token")

        let CreatedUser;
        try {
            CreatedUser = await auth.api.signUpEmail({
                body : {
                    name : validatedUser.name,
                    email : validatedUser.email,
                    password : validatedUser.password,
                },
            })
        }
        catch (error)
        {
            newUser = {
                error : true,
                message : `Account Creation failed - ${error.message}`
            }
            // Restore the user's session token
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
            return fail(400, { newUser })
        }

        try
        {
            const userId = Number(CreatedUser.user.id)
            // Add RM points of the user
            await usersService.insertUserPoints(userId, Number(ValidatedRMPoints.id))

            // Add privilage
            console.log(userId)
            if ("on" == privilaged)
                { await usersService.Insertadmins(userId, true, true) }
            // Add admin
            else if ("on" === admin)
                { await usersService.Insertadmins(userId, true, false) }

        }
        catch (error)
        {
            console.log(error)
            newUser = {
                error : true,
                message : `Account Creation failed to insert extra info`
            }
            // Restore the user's session token
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
            return fail(400, { newUser })
        }

        // Account created
        // Signout to remove session token from new user
        try
        {
            await auth.api.signOut({
                headers : { cookie : CreatedUser.token }
            })
            // Restore the user's session token
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
        }
        catch (error)
        {
            newUser = {
                error : true,
                message : `Account created, but failed with ${error.message}`
            }
            // Restore the user's session token
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
            return fail(400, { newUser })
        }

        // Return expected values even if something goes wrong
        return { newUser }
    },

    async editAccounut()
    {
        edits = {
            error : true,
            message : "Not implemented"
        }
        return { edits }
    },

    async deleteAccount( { request, cookies } )
    {
        console.log("1")
        const data = await request.formData()
        const email = data.get("email")
        let deleted = {
            error : false,
            message : "Account deleted"
        }
        console.log("1")

        let validatedId;
        try
        {
            const validatedEmail = validateUserEmail.parse({email}).email
            const userId = await usersService.getUserByEmail(validatedEmail)
            validatedId = idSchema.parse(userId)
            console.log("1")
        }
        catch (error)
        {
            console.log(error)
            deleted = {
                error : true,
                message : `Unable to find user ${email}`
            }
            return { deleted }
        }

        try
        {
            await usersService.deleteAccount(validateUser, "Admin delete", cookies.get("better-"))
        }
        catch (error)
        {
            console.log(error)
            deleted = {
                error : true,
                message : "Failed to delete user"
            }
        }
        console.log("1")
        return { deleted }
    }

}