// author : Glen

// Third party
import { usersService } from "$lib/server/services/users-service"
import { redirect } from "@sveltejs/kit"
// Ours
// import { usersService } from "$lib/server/services/users-service";

export async function load( { locals } ) {
    if (!locals.user?.name) { redirect(308, "/auth/signin") }

    try
    {
        const access = await usersService.canAccessAdmin(locals.user.id);

        if (!access.admin)
            { redirect(308, "/account") }
    }
    catch (error)
    {
        console.log(error)
        redirect(308, "/") 
    }
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
