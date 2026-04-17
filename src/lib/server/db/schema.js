import { primaryKey } from 'drizzle-orm/gel-core';
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { user } from './auth.schema';

// Start of Glen's DB work

export const admins = sqliteTable('admins', {
	id: integer().primaryKey({autoIncrement : true}),
    userId: integer("user_id", { mode : "number"})
		.notNull()
		.references(() => user.id, { onDelete: "cascade" })
		.unique(),
	admin: integer({ mode: 'boolean' }).default(false).notNull(),
	privilage: integer({ mode: 'boolean' }).default(false).notNull()
})

export const rewardPoints = sqliteTable("rewardpoints", {
	userId: integer("user_id", { mode : "number"})
		.notNull()
		.primaryKey()
		.references(() => user.id, { onDelete: "cascade" }),
	points: integer({mode : "number"}).default(0)
})

// End of Glen's work


export const food = sqliteTable('food', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	price: integer().notNull(),
	image: text()
});

export * from './auth.schema';

// Start of Alex's movies db
export const movies = sqliteTable("movies", {
  id: integer("id").primaryKey(),
  title: text("title"),
  rating: text("rating"),
  poster: text("poster"),
  ratingScore: real("ratingScore"),
  description: text("description"),
});

export const genres = sqliteTable("genres", {
  id: integer("id").primaryKey(),
  name: text("name")
});

export const movieGenres = sqliteTable("movie_genres", {
  movieId: integer("movie_id").notNull(),
  genreId: integer("genre_id").notNull()
});

// Start of Alex's Contact us DB

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  message: text("message"),
  createdAt: text("created_at").default(new Date().toISOString())
});


// Start of Alex's and Glen's bookings and screenings system DB

export const screens = sqliteTable("screens", {
  id: integer("id").primaryKey(),
  name: text("name"),
  // This will be "AAAAA AAAAAAA\nAAAAAAA AAAAA" 
  seats: text("capacity"),
});

export const screenings = sqliteTable("screenings", {
    id: integer("id").primaryKey(),

    startTime: text("start_time"),
    endTime: text("end_time"),
    price: real("price"),

    // Links
    screenId: integer("screen_id").notNull(),
    movieId: integer("movie_id").notNull(),

});

export const bookings = sqliteTable("bookings", {
    id: integer("id").primaryKey(),

    userId: integer("user_id"),
    totalPrice: real("total_price"),
    status: text("status"), 
    reservedAt: integer("reserved_at", { mode: "timestamp_ms" })
    .default(new Date())
    .notNull(),
    cancelledAt: integer("cancelled_at", { mode: "timestamp_ms" }).default(0),

    // Links
        // Showings should have screen ID in them.
    showingId: integer("showing_id").notNull(),
});

export const bookedSeats = sqliteTable("booked_seats", {
    id: integer("id").primaryKey(),

    seat: text("seat"),

    // Links
      // A showing is linking a screen showing's booked seats rather than a screens
    showingId: integer("showing_id").notNull(),
    bookingId: integer("booking_id").notNull(),
});
