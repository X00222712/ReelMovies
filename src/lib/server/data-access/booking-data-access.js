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
    }

}