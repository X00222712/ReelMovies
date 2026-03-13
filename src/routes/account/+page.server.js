import { usersService } from "$lib/server/services/users-service";
import { json } from "@sveltejs/kit";

import { newAccount } from "./test";


export async function load( { cookies } ) {
    let userToken = cookies.get("userToken");
    let signedIn = true;

    if (String.undefined === userToken || null === userToken || "null" === userToken)
        { signedIn = false; }
    else { signedIn = true; }

    return { signedIn: signedIn}
}

export const actions = {
    signout: async ({ request, cookies }) =>
    {
        let userToken =  cookies.get("userToken")
        cookies.set("userToken", null, {path : "/"});

        if (usersService.signoutUser(userToken))
            { return { status : 409 }; }

        return {status : 200}
    }
}

