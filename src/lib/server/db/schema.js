import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// https://www.reddit.com/r/SQL/comments/1499e93/whats_a_smart_way_of_tackling_multiple_genres_in/
/*
poster: Throw_mob
	make it 1:m relationship
	move_id , genre_id in one table and another table where genre_id, genre_name are stored.
	If you just want learn more about how to do things in postgresql then see how to use arrays or/and jsonb type or howto search string in strings
*/
export const movies = sqliteTable("movies", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	description: text().notNull(),
	poster: text().notNull(),
	// Genres
});

export const recMovies = sqliteTable("recmovies", {
	id: integer().primaryKey({ autoIncrement: true}),
	movied: integer().references(() => movies.id)
})


/*
RELATIONSHIPS
*/
export const recMoviesRelationship = relations(recMovies, ({ one }) => ({
	movies: one(movies, {
		fields: [recMovies.movied],
		references: [movies.id]
	})
}))