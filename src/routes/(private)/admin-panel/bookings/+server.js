// Author : Glen J

// third part
import { json, redirect } from "@sveltejs/kit";
// Ours
import { idSchema, validateUserEmail } from "$lib/server/db/validation";
import { bookingService } from "$lib/server/services/booking-service";
import { screenService } from "$lib/server/services/screeningService";
import { usersService } from "$lib/server/services/users-service";

export async function GET({ url }) {
    const email = url.searchParams.get("email");

    let validatedEmail;
    try {
        validatedEmail = validateUserEmail.parse( {email : email} )
    }
    catch (e) {
        console.log("Couldn't validate Email")
        console.log(e)
        return json( {bookings : [], message: "Email is invalid"} , { status: 400});
    }

    let userId;
    try { userId = await usersService.getUserByEmail(validatedEmail.email) }
    catch (e) {
        console.log(e)
        return json( {bookings : [], message: "No email found"} , { status: 400});
    }

    let validatedId;
    try {
        const id = userId.id
        validatedId = idSchema.parse({id})
    }
    catch (e) {
        console.log("Couldn't validate userId")
        console.log(e)
        return json( {bookings : [], message: "An error occured"} , { status: 400});
    }


    let bookings = []
    try
        { bookings = await bookingService.getUserBookings(validatedId.id) }
    catch (e) {
        console.log(e)
        return json( {bookings : [], message: "Unable to get bookings"} , { status: 400});
    }

    let bookingInfo = []
    try {
        for (const booking of bookings)
        {
            const screeningInfo = await screenService.getScreeningInfo( booking.screeningId )
            let movie = screeningInfo.movie
            movie.genre = []
            bookingInfo.push({ booking, screening : screeningInfo.screening, movie : movie })
        }
    }
    catch (e) {
        console.log(e)
        return json( {bookings : [], message: "Unable to get screening info"} , { status: 400});
    }

    return json( {bookings : bookingInfo} , { status: 200 });
}

