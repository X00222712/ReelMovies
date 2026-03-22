import { usersService } from "$lib/server/services/users-service";
import { fail, json, redirect } from "@sveltejs/kit";

async function signin(username, password, cookies) {
        const userToken = await usersService.signinUser(username, password);
        if ("NO SIGNIN" === userToken)
            { return { status : 401}; }
        if ("SAF" === userToken)
            { return { status : 409}; }
        cookies.set("userToken", userToken, {path : "/"})
        redirect(303, "/");
}

export const actions = {
    signup: async ({request, cookies}) =>
    {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        const confirmPassword = data.get("confirmPassword");
        const taken = await usersService.addUser(username, password)
        console.log(taken)
        if ("TAKEN" === taken)
            { return {status : "TAKEN"} }
        await signin(username, password, cookies)
    },

    signin: async ({ request, cookies }) =>
    {

        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        await signin(username, password, cookies);
    }
}