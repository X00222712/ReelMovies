import { usersService } from "$lib/server/services/users-service";
import { json } from "@sveltejs/kit";


export async function load( { cookies, locals } ) {
    let signedIn = false;

    if (locals?.user)
        { signedIn = true }

    return { signedIn: signedIn}
}
