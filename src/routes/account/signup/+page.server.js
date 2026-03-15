import { usersService } from "$lib/server/services/users-service";
import { redirect, json } from "@sveltejs/kit";

export const actions = {
    signup: async ({request, cookies}) =>
    {
        try {
            const data = await request.formData();
            const username = data.get("username");
            const email = data.get("email");
            const password = data.get("password");
            const confirmPassword = data.get("confirmPassword");
            
            // Verify all inputs
            if (password !== confirmPassword) { return {error : true, status : "Passwords don't match"} }
            
            // All inputs verified, add user
            await usersService.addUser(username, password, email)
            await usersService.signinUser(username, password)
        }
        catch (error)
            { return {error : true, status : error.message} }
        redirect(303, "/")

    },

    signin: async ({ request, cookies }) =>
    {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        await signin(username, password, cookies);
    }
}