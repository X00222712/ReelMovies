// Author : Glen J

// Third Pary
import { fail, redirect } from "@sveltejs/kit";
// Our
import { idSchema, validateCost } from "$lib/server/db/validation";
import { bookingService } from "$lib/server/services/booking-service";
import { usersService } from "$lib/server/services/users-service";


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
        const email = data.get("email")
        const bookingId = Number(data.get("bookingId"));

        // Feilds
        const editHasPaid = "on" == data.get("edit has paid")
        const editPrice = "on" == data.get("edit price")
        const editDiscount = "on" == data.get("edit discount")

        // Data"
        const hasPaid = "on" == data.get("has paid")
        const price = data.get("price")
        const discount = data.get("discount")


        if (editHasPaid)
            {
                await bookingService.markPaid( bookingId, hasPaid )
            }
        if (editPrice)
            {
                let validatedPrice
                try { validatedPrice = validateCost.parse({cost : Number(price)}).cost }
                catch (e)
                {
                    console.log(e)
                    return fail(400, {error: true, message : 'Invalid price', email})
                }
                await bookingService.updatePrice( bookingId, validatedPrice )
            }
        if (editDiscount)
            {

                let validatedDiscount
                try { validatedDiscount = validateCost.parse({cost : Number(discount)}).cost }
                catch (e)
                {
                    console.log(e)
                    return fail(400, {error: true, message : 'Invalid price', email})
                }
                await bookingService.updateDiscount( bookingId, validatedDiscount )
            }

        return fail(200, { email })
    },

    delete: async ( { request } ) => {

        const data = await request.formData();
        const email = data.get("email")
        const bookingId = data.get("bookingId")

        await bookingService.deleteBooking( bookingId )
        return fail(200, { email })
    }
}