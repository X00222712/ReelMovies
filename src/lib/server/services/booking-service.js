import { db } from '$lib/server/db';
import { bookings } from '$lib/server/db/schema';

export const bookingService = {
	async bookTickets({ userId, screeningId, seats, paymentMethod, totalPrice }) {
		const [booking] = await db
			.insert(bookings)
			.values({
				userId,
				screeningId,
				seats: JSON.stringify(seats),
				paymentMethod,
				totalPrice
			})
			.returning();

		return booking;
	}
};
