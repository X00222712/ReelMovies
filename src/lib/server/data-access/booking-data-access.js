import { eq } from "drizzle-orm"
import { db } from "../db/db"
import { bookings } from "../db/schema"


const bookingInfo = {
    screeningId : bookings.screeningId,
    seats : bookings.seats,
    paymentMethod : bookings.paymentMethod,
    price : bookings.totalPrice,
    bookedAt : bookings.createdAt
}

export const bookingDataAccess = {

    async bookTickets(userId, screeningId, seats, paymentMethod, totalPrice) {
        const [booking] = await db
            .insert(bookings)
            .values({
            userId,
            screeningId,
            seats: JSON.stringify(seats),
            paymentMethod,
            totalPrice
        }).returning();
        return booking;
    },

    async getUserBookings( userId )
        { return await db.select(bookingInfo).from(bookings).where( eq(userId, bookings.userId) ) }
}