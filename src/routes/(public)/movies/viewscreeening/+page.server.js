// Author : Glen J
import { bookingService } from '$lib/server/services/booking-service';
import { screenService } from '$lib/server/services/screeningService';


export async function load({url, locals}) {

    const screeningId = Number(url.searchParams.get("screening")) ?? -1
    if (-1 === screeningId)
        { redirect(308, '/movies') }


    const selectionInfo = {
        movieid : 0,
        screening : ''
    }

    const screeningRows = await screenService.getScreening( screeningId )
    const bookingRows = await bookingService.getBookedScreening( screeningId ) ?? {}

    const takenSeatsByScreening = {};

    for (const booking of bookingRows) {
        if (!takenSeatsByScreening[booking.screeningId]) {
            takenSeatsByScreening[booking.screeningId] = [];
        }

        let bookedSeats = [];
        if (booking.seats)
        {
            bookedSeats = JSON.parse(booking.seats);
        }
        takenSeatsByScreening[booking.screeningId].push(...bookedSeats);
    }

    const screeningData = screeningRows.map((screening) => ({
        ...screening,
        screenSeats: screening.screenSeats.split('|'),
        takenSeats: takenSeatsByScreening[screening.id] ?? []
    }));

    return {
        selection : selectionInfo,
        screenings: screeningData
    };
}
