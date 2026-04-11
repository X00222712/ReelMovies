// author : Glen

// Third party
import { redirect } from "@sveltejs/kit"
// Ours
// import { usersService } from "$lib/server/services/users-service";

export async function load( { locals } ) {
    if (!locals.user?.name) { redirect(308, "/auth/signin") }
}
    // let access;
    // try
    //     { access = await usersService.canAccessAdmin(validatedId) }
    // catch (error)
    //     {
    //         console.log(error)
    //         return { user : {}, failed : {status : true, message : "Could not validate user"} }
    //     }

    // if (1 > access.length || false === access?.admin)
    //     { return redirect(302, '/') }
