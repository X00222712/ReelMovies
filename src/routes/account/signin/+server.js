import { usersService } from "$lib/server/services/users-service";
import { json } from "@sveltejs/kit";

export async function POST({request, cookies}) {
    const { username, password } = await request.json();
    const userToken = await usersService.signinUser(username, password);
    cookies.set("userToken", userToken, {path : "/"})
    return json({status : 200})
}