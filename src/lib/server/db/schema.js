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
export const screens = sqliteTable('screens', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	seats: text('seats').notNull()
});

export const screenings = sqliteTable('screenings', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	movieId: integer('movie_id')
		.notNull()
		.references(() => movies.id, { onDelete: 'cascade' }),
	screenId: integer('screen_id')
		.notNull()
		.references(() => screens.id, { onDelete: 'cascade' }),
	date: text('date').notNull(),
	time: text('time').notNull()
});

export const bookings = sqliteTable('bookings', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id')
		.references(() => user.id, { onDelete: 'cascade' }),
	screeningId: integer('screening_id')
		.notNull()
		.references(() => screenings.id, { onDelete: 'cascade' }),
	seats: text('seats').notNull(),
	paymentMethod: text('payment_method').notNull(),
	paid : integer('paid', {"mode" : "boolean"})
		.default(false)
		.notNull(),
	discount : real('discounts')
		.default( 0.0 )
		.notNull(),
	price: real('price').notNull(),
	totalPrice: real('total_price').notNull(),
	createdAt: text('created_at')
		.default(new Date().toISOString())
		.notNull(),
	updatedAt: text('updated_at')
		.default(new Date().toString())
		.$onUpdate(() => new Date().toString())
		.notNull(),
});

export const loyaltyRewards = sqliteTable('loyalty_rewards', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	description: text('description'),
	pointsCost: integer('points_cost').notNull(),
	image: text('image')
});

export const loyaltyRedemptions = sqliteTable('loyalty_redemptions', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	rewardId: integer('reward_id')
		.notNull()
		.references(() => loyaltyRewards.id, { onDelete: 'cascade' }),
	pointsSpent: integer('points_spent').notNull(),
	createdAt: text('created_at').default(new Date().toISOString())
});
