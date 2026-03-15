import { usersService } from "$lib/server/services/users-service";
import { json } from "@sveltejs/kit";


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
        usersService.signoutUser(userToken)
        return {status : 200}
    }
}

