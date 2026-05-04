import { eq } from "drizzle-orm"
import { db } from "../db"
import { bookings } from "../db/schema"


const bookingInfo = {
    id : bookings.id,
    screeningId : bookings.screeningId,
    seats : bookings.seats,
    paymentMethod : bookings.paymentMethod,
    paid : bookings.paid,
    price : bookings.price,
    discount : bookings.discount,
    totalPrice : bookings.totalPrice,
    bookedAt : bookings.createdAt
}

const screeningSeatInfo = {
    screeningId : bookings.screeningId,
    seats : bookings.seats
}

export const bookingDataAccess = {

    async bookTickets(userId, screeningId, seats, paymentMethod, discount, price) {

        let paid = false
        if ("card" == paymentMethod)
            { paid = true }

        const totalPrice = price - discount

        const [booking] = await db
            .insert(bookings)
            .values({ userId, screeningId, seats, paymentMethod, paid, discount, price, totalPrice})
            .returning();
        return booking;
    },

    async getUserBookings( userId )
        { return await db.select(bookingInfo).from(bookings).where( eq(userId, bookings.userId) ) },

    async getAllBookedScreening()
    {
        const resutls = await db.select(screeningSeatInfo).from(bookings)
        return resutls
    },

    async getBookedScreening( screeningId )
    {
        const resutls = await db.select(screeningSeatInfo).from(bookings).where( eq( screeningId, bookings.screeningId ) )
        return resutls
    },

    async markPaid( bookingId, status )
    {
        await db.update(bookings)
            .set( { paid : status} )
            .where( eq( bookingId, bookings.id ) )
    },


	async updatePrice( bookingId, price)
		{ 
            const discount = await db
                .select({discount : bookings.discount})
                .from(bookings)
                .where( eq( bookingId, bookings.id ) )
            const totalPrice = price - discount[0].discount

            await db.update(bookings)
                .set({
                    price,
                    totalPrice
                })
                .where( eq( bookingId, bookings.id ) )
        },

	async updateDiscount( bookingId, discount)
		{
            const price = await db
                .select({price : bookings.price})
                .from(bookings)
                .where( eq( bookingId, bookings.id ) )
            const totalPrice = price[0].price - discount

            await db.update(bookings)
                .set({
                    discount,
                    totalPrice
                })
                .where( eq( bookingId, bookings.id ) )
        },

    async deleteBooking( bookingId ) {
        await db.delete(bookings)
            .where( eq( bookingId, bookings.id ) )
    }
}