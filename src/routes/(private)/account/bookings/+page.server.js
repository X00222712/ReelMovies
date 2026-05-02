import { bookingService } from "$lib/server/services/booking-service"
import { moviesService } from "$lib/server/services/movie-service"
import { screenService } from "$lib/server/services/screeningService"
import { redirect } from "@sveltejs/kit"


export async function load({ locals }) {

    if (!locals?.user)
        { redirect(308, "/auth/signin") }

    let bookings = []
    let bookingInfo = []
    try
        { bookings = await bookingService.getUserBookings(Number(locals.user.id)) }
    catch (e)
        {
            console.log(`Booking "Get" error ${e}`)
            redirect(308, "/")
        }

    try {
        for (const booking of bookings)
        {
            // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
            const screeningInfo = await screenService.getScreeningInfo( booking.screeningId )
            bookingInfo.push({ booking, screening : screeningInfo.screening, movie : screeningInfo.movie })
        }
        
    }
    catch (e) {
        console.log(`Booking "Get" error ${e}`)
        redirect(308, "/")
    }
    return { bookings : bookingInfo }
}