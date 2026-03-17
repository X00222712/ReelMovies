// Third part
import { fail, json, redirect } from "@sveltejs/kit";
import { ZodError } from "zod";
import { APIError } from "better-auth";
import { auth } from "$lib/server/auth";

// Our stuff
import { usersService } from "$lib/server/services/users-service";
import { validateUserLogin } from "$lib/server/db/validation";


export const actions = {
    signin: async ({ request, cookies }) =>
    {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        try {
            // Verify all inputs
            validateUserLogin.parse({
                email : email,
                password
            })
        } catch (error)
        {
            console.log(error)
            return fail(500, {error : true, message : "Unexpected error"})
        }

        try {
            // All inputs verified, add user
            await auth.api.signInEmail({
                body : {
                    email,
                    password,
                    callbackURL : '/auth/verification-success'
                }
            })
        }
        catch (error)
        {
            if (error instanceof APIError) return fail(400, {error : true, message : error.message || "Signin failed"})
            if (error instanceof ZodError) return fail(401, {error : true, message : "Details are wrong, try again" })
            return fail(500, {error : true, message : "Unexpected error"})
        }
        redirect(303, "/account");
    }
}