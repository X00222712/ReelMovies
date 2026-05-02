import { bookingService } from "$lib/server/services/booking-service"
import { redirect } from "@sveltejs/kit"


export async function load({ locals }) {

    if (!locals?.user)
        { redirect(308, "/auth/signin") }

    console.log(locals.user)

    try
        { await bookingService.getUserBookings(Number(locals.user.id)) }
    catch (e)
        {
            console.log(`Booking "Get" error ${e}`)
            redirect(308, "/")
        }

}