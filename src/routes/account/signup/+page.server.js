// third part
import { fail, redirect, json } from "@sveltejs/kit";
import { ZodError } from "zod";
import { APIError } from "better-auth";
import { auth } from "$lib/server/auth";

// Out stuff
import { usersService } from "$lib/server/services/users-service";
import { validateUser } from "$lib/server/db/validation";
import { ValidationError } from "$lib/server/utils/errors";

export async function load( { locals } ) {
    if (locals.user?.name) { return redirect(308, "/account") }
}

export const actions = {
    signup: async ({ request }) =>
    {
        const data = await request.formData();
        const name = data.get("username")
        const email = data.get("email")
        const password = data.get("password")
        const confirmPassword = data.get("confirmPassword");

        let validatedData;
        // Verify all inputs
        try {
            if (password !== confirmPassword) { throw new ValidationError("Passwords don't match") }
            validatedData = validateUser.parse({ name, email, password })
        } catch(error) {
            console.log(error.message)
            return fail(400, {error: true, message : "Details not valid"})
        }

        // Create user
        try {
            // Sign up
            const user = await auth.api.signUpEmail({
                body : {
                    name : validatedData.name,
                    email : validatedData.email,
                    password : validatedData.password,
                    callbackURL : "/auth/verification-success"
                }
            })
            usersService.insertUserPoints(Number(user.user.id))
        } catch (error)
            {
                if (error instanceof APIError) return fail(400, {error: true, message : error.message || "Registration failed"})
                return fail(500, {error: true, message : "Unexpected error"})
            }
        // Signin
        try {
            // All inputs verified, add user
            await auth.api.signInEmail({
                body : {
                    email : validatedData.email,
                    password : validatedData.password,
                    callbackURL : '/auth/verification-success'
                }
            })
        }
        catch (error)
            {
                if (error instanceof APIError) return fail(400, {error: true, message : error.message || "Signin failed"})
                if (error instanceof ZodError) return fail(401, {error: true, message : "Details are wrong, try again" })
                return fail(500, {error: true, message : error.message || "Unexpected error"})
            }
        return redirect(303, "/");

    },
}