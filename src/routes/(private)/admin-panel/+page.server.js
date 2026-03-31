/*

Author : Glen Johnston
Create : 23 / Mar / 2026

Description

Admin panel functions and data

*/


import { auth } from "$lib/server/auth"
import { idSchema, validateUser } from "$lib/server/db/validation"
import { usersService } from "$lib/server/services/users-service"
import { fail } from "@sveltejs/kit"

export async function load() {
    // Validate maybe in the future
    const users = await usersService.getUsersPageByID(1, 4)
    return { users }
}

export const actions = {
    async createUser( { request, cookies } ) {
        const data = await request.formData()
        const username = data.get("username")
        const email = data.get("email")
        const password = data.get("password")
        const reelpoints = Number(data.get("RM points"))

        const admin = data.get("admin")
        const privilaged = data.get("privilaged")
        console.log(admin, privilaged)

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
            console.log(password.length)
            CreatedUser = await auth.api.signUpEmail({
                body : {
                    name : validatedUser.name,
                    email : validatedUser.email,
                    password : validatedUser.password,
                },
            })
            // Restore the user's session token
            cookies.set("better-auth.session_token", userSigninCookie, { path : "/" })
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
            // Add RM points of the user
            console.log(ValidatedRMPoints)
            console.log(Number(ValidatedRMPoints.id))
            // usersService.insertUserPoints(CreatedUser.user.id)

            // Add admin
            // Add IT privilage

        }
        catch (error)
        {
            newUser = {
                error : true,
                message : `Account Creation failed to insert extra info - ${JSON.parse(error)[0].message}`
            }
            return fail(400, { newUser })
        }

        // Account created
        // Signout to remove session token from new user
        try
        {
            auth.api.signOut({
                headers : { cookie : CreatedUser.token }
            })
        }
        catch (error)
        {
            newUser = {
                error : true,
                message : `Account created, but failed with ${error.message}`
            }
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

    async deleteAccount()
    {
        deleted = {
            error : true,
            message : "Not implemented"
        }
        return { deleted }
    }

}