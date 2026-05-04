import { bookingDataAccess } from '../data-access/booking-data-access';

export const bookingService = {
	async bookTickets({ userId, screeningId, seats, paymentMethod, discount, price }) {
		const booking = await bookingDataAccess.bookTickets(userId, screeningId, JSON.stringify(seats), paymentMethod, discount, price)
		return booking
	},

	async getUserBookings( userId )
		{ return await bookingDataAccess.getUserBookings( userId ) },

    async getAllBookedScreening( screeningId )
		{ return await bookingDataAccess.getAllBookedScreening( screeningId ) },

    async getBookedScreening( screeningId )
};
