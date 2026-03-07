import { usersService } from "$lib/server/services/users-service";
import { fail, json, redirect } from "@sveltejs/kit";

export const actions = {
    signin: async ({ request, cookies }) =>
    {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        const userToken = await usersService.signinUser(username, password);
        if ("NO SIGNIN" === userToken)
            { return { status : 401}; }
        if ("SAF" === userToken)
            { return { status : 409}; }
        cookies.set("userToken", userToken, {path : "/"})
        redirect(303, "/");
    }
}