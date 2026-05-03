// Author : Glen J

import { idSchema } from "$lib/server/db/validation";
import { usersService } from "$lib/server/services/users-service";
import { fail, redirect } from "@sveltejs/kit";


export async function load({ locals }) {

    if (!locals?.user)
        { redirect(308, "/auth/signin") }

    let validatedId;
    try
        { validatedId = idSchema.parse({id : Number(locals.user.id)}).id }
    catch (error)
    // This will show an error message,
    // Could do something better but we only need it to work
    {
        console.log(error)
        return redirect(302, '/')
    }

    let access;
    try
        { access = await usersService.canAccessAdmin(validatedId) }
    catch (error)
        {
            console.log(error)
            return redirect(302, '/account')
        }

    if (1 > access.length || false === access?.admin)
        { return redirect(302, '/') }

}


export const actions = {
    editBooking: async ({ request }) =>
    {

        const data = await request.formData();

        console.log(data)

        const email = data.get("email")

        const bookings = data.get("bookings")
        const bookingId = data.get("booking id");
        const edits = data.get("edit has paid");

        console.log('hi')
        console.log(email)

        return fail(200, { email })
    }
}