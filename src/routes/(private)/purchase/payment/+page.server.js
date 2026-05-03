// Author : Alex D

import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { movies, screens, screenings, bookings, rewardPoints } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

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
		const seatType = seatLayout[row][col];
		total += seatPrices[seatType] ?? 0;
	}

	return Number(total.toFixed(2));
}

export async function load({ url, locals }) {
	if (!locals.user) {
		throw redirect(303, '/auth/signin');
	}

	const screeningId = Number(url.searchParams.get('screeningId'));
	const selectedSeats = url.searchParams.get('seats')?.split('|') ?? [];

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
	const totalPrice = calculateTotal(seatLayout, selectedSeats);

	return {
		screening,
		selectedSeats,
		totalPrice
	};
}

export const actions = {
	pay: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/auth/signin');
		}

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
			.innerJoin(screens, eq(screenings.screenId, screens.id))
			.where(eq(screenings.id, screeningId));

		if (!screening) {
			return fail(404, { message: 'Screening not found.' });
		}
        if (paymentMethod === 'card') {
	        if (!cardName || !cardNumber || !expiryDate || !cvv) {
		        return fail(400, { message: 'Please enter your card details.' });
	        }
        }


		const totalPrice = calculateTotal(screening.screenSeats.split('|'), selectedSeats);

		await db.insert(bookings).values({
			userId: Number(locals.user.id),
			screeningId,
			seats: JSON.stringify(selectedSeats),
			paymentMethod,
			totalPrice
		});

		const userId = Number(locals.user.id);
		const pointsEarned = Math.floor(totalPrice * 10);

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


		throw redirect(303, '/purchase/payment/success');
	}
};
