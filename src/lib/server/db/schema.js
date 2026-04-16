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
  capacity: integer("capacity"),
});

export const seats = sqliteTable("seats", {
  id: integer("id").primaryKey(),
  screenId: integer("screen_id").notNull(),
  row: text("row"),
  number: integer("number"),
});

export const screenings = sqliteTable("screenings", {
  id: integer("id").primaryKey(),
  movieId: integer("movie_id").notNull(),
  screenId: integer("screen_id").notNull(),
  startTime: text("start_time"),
  endTime: text("end_time"),
  price: real("price"),
});

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey(),
  screeningId: integer("screening_id").notNull(),
  userId: integer("user_id"),
  totalPrice: real("total_price"),
  status: text("status"), 
  reservedAt: text("reserved_at").default(new Date().toISOString()),
  cancelledAt: text("cancelled_at"),
  seatsCount: integer("seats_count")
});

export const bookingSeats = sqliteTable("booking_seats", {
  id: integer("id").primaryKey(),
  bookingId: integer("booking_id").notNull(),
  seatId: integer("seat_id"),
  seatLabel: text("seat_label"),
  price: real("price")
});
