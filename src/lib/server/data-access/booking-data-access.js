import { eq } from "drizzle-orm"
import { db } from "../db"
import { bookings } from "../db/schema"


const bookingInfo = {
    id : bookings.id,
    screeningId : bookings.screeningId,
    seats : bookings.seats,
    paymentMethod : bookings.paymentMethod,
    price : bookings.totalPrice,
    bookedAt : bookings.createdAt
}

const screeningSeatInfo = {
    screeningId : bookings.screeningId,
    seats : bookings.seats
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
        { return await db.select(bookingInfo).from(bookings).where( eq(userId, bookings.userId) ) },

    async getAllBookedScreening()
    {
        const resutls = await db.select(screeningSeatInfo).from(bookings)
        return resutls
    }

}