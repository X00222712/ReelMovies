import { primaryKey } from 'drizzle-orm/gel-core';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user } from './auth.schema';

// Start of Glen's DB work

export const admins = sqliteTable('admins', {
	id: integer().primaryKey({autoIncrement : true}),
    userId: integer("user_id", { mode : "number"})
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
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
  poster: text("poster")
});

export const genres = sqliteTable("genres", {
  id: integer("id").primaryKey(),
  name: text("name")
});

export const movieGenres = sqliteTable("movie_genres", {
  movieId: integer("movie_id"),
  genreId: integer("genre_id")
});

// Start of Alex's Contact us DB

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  message: text("message"),
  createdAt: text("created_at").default(new Date().toISOString())
});