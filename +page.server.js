// Third part
import { fail, json, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import { APIError } from "better-auth";
import { ZodError } from "zod/v3";
// Ours
import { usersService } from "$lib/server/services/users-service";
import { validateUserName, validateUserPassword } from "$lib/server/db/validation";



export async function load( { locals } ) {
    let signedIn = false;
    let user;
    if (locals.user?.name) {
        signedIn = true
        user = await usersService.getUser(Number(locals.user.id));
    }
    else user = {name:null, email:null}

    return { signedIn: signedIn, user : user}
}


export const actions = {
    changePW : async ({ request }) => {
        const data = await request.formData();
        const password = data.get("password")
        const newPassword = data.get("newPassword") ?? ""
        const confirmPassword = data.get("confirmPassword") ?? "";
        if (newPassword !== confirmPassword && newPassword + confirmPassword !== "") { return fail(400, {for: "pw", message : "Wrong password" }) }

        try { const validated = validateUserPassword.parse({password : newPassword}) }
        catch (error) {
            const firstError = JSON.parse(error.message)[0]
            return fail(400, { for : "pw", message : firstError.message})
        }

        try {
            await auth.api.changePassword({
                body : {
                    newPassword : validated.password,
                    currentPassword : password
                },
                headers: request.headers,
            })
        } catch (error)
        {
            if (error instanceof APIError) return fail(400, {for: "pw", message : error.message || "Could not change password"})
            return fail(500, {for: "pw", massage : "Internal error"})
        }
    },

    changeUN : async ({ request }) => {
        const data = await request.formData();
        const newUsername = data.get("newUsername")

        try { const validated = validateUserName.parse({ name : newUsername }) }
        catch (error) {
            const firstError = JSON.parse(error.message)[0]
            return fail(400, { for : "un", message : firstError.message})
        }

        try {
            await auth.api.updateUser({
                body : {
                    name : newUsername
                },
                headers : request.headers
            })
        }
        catch (error)
        {
            if (error instanceof APIError) return fail(400, {for : "un", message : error.message || "Could not change username"})
            return fail(500, {for: "un", message : "Internal error"})
        }
        redirect(303, "/account")
    },

    changeEmail : async ({ request }) => {
        const data = await request.formData();
        const newEmail = data.get("newEmail")
        const password = data.get("password")

        try {
            await auth.api.verifyPassword({
                body : { password },
                headers : request.headers
            })
        }
        catch (error) { return fail(400, {for: "em", message : error.message || "Password incorrect"}) }

        try {
            await auth.api.changeEmail({
                body : {
                    newEmail : newEmail,
                    callbackURL: "/auth/verification-success"
                },
                headers : request.headers
            })
        }
        catch (error)
        {
            console.log(error)
            if (error instanceof APIError) return fail(400, {for : "em", message : error.message || "Could not change email"})
            return fail(500, {for: "em", message : "Internal error"})
        }
    },

    deleteUser : async ({ request }) => {
        const data = await request.formData();
        const password = data.get("password")

        try
        {
            auth.api.deleteUser({
                body : {
                    password
                },
                headers : request.headers
            })
        }
        catch (error)
        {
            console.log(error)
            if (error instanceof APIError) return fail(400, {for : "de", message : error.message || "Could not change emai"})
            return fail(500, {for: "de", message : "Internal error"})
        }
        redirect(303, "/account")
    }
}