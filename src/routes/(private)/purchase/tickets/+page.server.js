// Author : Alex D & Glen J

import { fail, redirect } from '@sveltejs/kit';

import { bookingService } from '$lib/server/services/booking-service';
import { screenService } from '$lib/server/services/screeningService';

const seatPrices = {
	S: 5.99,
	R: 7.99,
	V: 9.99,
	D: 5.99
};

export async function load({url, locals}) {

	if (!locals.user)
		{ throw redirect(303, '/auth/signin') }

	const movieID = Number(url.searchParams.get("movieid")) ?? 0
	const screentime = /*url.searchParams.get("screening") ??*/ ''


	const selectionInfo = {
		movieid : movieID,
		screening : screentime
	}

	const screeningRows = await screenService.getAllScreening()
	const bookingRows = await bookingService.getAllBookedScreening() ?? []
    console.log(bookingRows)

	const takenSeatsByScreening = {};

	for (const booking of bookingRows) {
		if (!takenSeatsByScreening[booking.screeningId]) {
			takenSeatsByScreening[booking.screeningId] = [];
		}

		const bookedSeats = JSON.parse(booking.seats);
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

export const actions = {
	book: async ({ request, locals }) => {
		const data = await request.formData();

		const screeningId = Number(data.get('screeningId'));
		const selectedSeats = data.getAll('selectedSeats');

		if (!screeningId) {
			return fail(400, { message: 'Please select a screening.' });
		}

		if (selectedSeats.length === 0) {
			return fail(400, { message: 'Please select at least one seat.' });
		}

		const params = new URLSearchParams({
			screeningId: String(screeningId),
			seats: selectedSeats.join('|')
		});

		throw redirect(303, `/purchase/payment?${params.toString()}`);
	}
};
