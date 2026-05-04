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
		{ return await bookingDataAccess.getBookedScreening( screeningId ) },

	async markPaid( bookingId, status )
		{ await bookingDataAccess.markPaid( bookingId, status ) },

	async updatePrice( bookingId, price)
		{ await bookingDataAccess.updatePrice( bookingId, price) },
	async updateDiscount( bookingId, discount)
		{ await bookingDataAccess.updateDiscount( bookingId, discount)},

	async deleteBooking( bookingId )
		{ await bookingDataAccess.deleteBooking( bookingId ) }
};
