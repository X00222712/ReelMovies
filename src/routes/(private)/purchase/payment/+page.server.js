// Author : Alex D

import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { movies, screens, screenings, bookings, rewardPoints } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { bookingService } from '$lib/server/services/booking-service';

const seatPrices = {
	S: 5.99,
	R: 7.99,
	V: 9.99,
	D: 5.99
};

function calculateTotal(seatLayout, selectedSeats) {
	let total = 0;

	for (const seat of selectedSeats) {
		const [row, col] = seat.split(',').map(Number);

		const seatType = seatLayout[row-1][col-1];
		total += seatPrices[seatType] ?? 0;
	}

	return Number(total.toFixed(2));
}

export async function load({ url, locals, cookies }) {
	if (!locals.user) {
		throw redirect(303, '/auth/signin');
	}

	const screeningId = cookies.get('RM-buySreening')
	const selectedSeats = cookies.get('RM-buySeats')

	if (!screeningId || selectedSeats.length === 0) {
		throw redirect(303, '/purchase/tickets');
	}

	const [screening] = await db
		.select({
			id: screenings.id,
			date: screenings.date,
			time: screenings.time,
			movieTitle: movies.title,
			screenName: screens.name,
			screenSeats: screens.seats
		})
		.from(screenings)
		.innerJoin(movies, eq(screenings.movieId, movies.id))
		.innerJoin(screens, eq(screenings.screenId, screens.id))
		.where(eq(screenings.id, screeningId));

	if (!screening) {
		throw redirect(303, '/purchase/tickets');
	}

	const seatLayout = screening.screenSeats.split('|');
	const pickedSeats = selectedSeats.split("|")
	console.log(seatLayout, pickedSeats)
	const totalPrice = calculateTotal(seatLayout, pickedSeats);

	return {
		screening,
		selectedSeats : pickedSeats,
		totalPrice
	};
}

export const actions = {
	pay: async ({ request, locals, cookies }) => {
		const data = await request.formData();

		const screeningId = Number(data.get('screeningId'));
		const selectedSeats = data.getAll('selectedSeats');

		const paymentMethod = data.get('paymentMethod');
        const cardName = data.get('cardName');
        const cardNumber = data.get('cardNumber');
        const expiryDate = data.get('expiryDate');
        const cvv = data.get('cvv');


		if (!paymentMethod) {
			return fail(400, { message: 'Please choose a payment method.' });
		}

		const [screening] = await db
			.select({
				screenSeats: screens.seats
			})
			.from(screenings)
			.where(eq(screenings.id, screeningId))
			.innerJoin(screens, eq(screenings.screenId, screens.id))

		if (!screening) {
			return fail(404, { message: 'Screening not found.' });
		}

        if (paymentMethod === 'card') {
			if (!cardName || !cardNumber || !expiryDate || !cvv) 
				{return fail(400, { message: 'Please enter your card details.' }) }
        }

		const seatLayout = screening.screenSeats.split('|');
		const price = calculateTotal(seatLayout, selectedSeats);

		const seatvalid = []

		selectedSeats.forEach(seat => {
			let [row, col] = seat.split(',')
			console.log(row, col)
			row = Number(row)
			col = Number(col)
			console.log(row, col)
			seatvalid.push( `${row}, ${col}` )
		});

		try {
		await bookingService.bookTickets({
			userId : Number(locals.user.id),
			screeningId,
			seats : seatvalid,
			paymentMethod,
			discount : 0,
			price
		})}
		catch (e)
		{
			console.log(e)
			redirect(303, '/purchase/payment/failure')
		}

		const userId = Number(locals.user.id);
		const pointsEarned = Math.floor(price * 10);

		const [pointsRow] = await db
			.select()
			.from(rewardPoints)
			.where(eq(rewardPoints.userId, userId));

		await db
			.update(rewardPoints)
			.set({
				points: (pointsRow?.points ?? 0) + pointsEarned
		})
			.where(eq(rewardPoints.userId, userId));

		// Booking successful, clear RM cookies
		cookies.set('RM-buySreening', '', { path: '/'} )
		cookies.set('RM-buySeats', '', { path: '/'} )

		throw redirect(303, '/purchase/payment/success');
	}
};
