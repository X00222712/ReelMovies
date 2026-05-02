import { db } from '$lib/server/db';
import { bookings } from '$lib/server/db/schema';
import { bookingDataAccess } from '../data-access/booking-data-access';

export const bookingService = {
	async bookTickets({ userId, screeningId, seats, paymentMethod, totalPrice }) {
		const [booking] = await bookingDataAccess.bookTickets(userId, screeningId, seats, paymentMethod, totalPrice)
		return booking
	},

	async getUserBookings( userId )
	{
		return bookingDataAccess
	}
};
