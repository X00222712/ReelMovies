import { primaryKey } from 'drizzle-orm/gel-core';
import { integer, sqliteTable, sqliteView, text } from 'drizzle-orm/sqlite-core';
import { user } from './auth.schema';

// Start of Glen's DB work

export const admins = sqliteTable('admins', {
	id: integer().primaryKey({autoIncrement : true}),
    userId: integer("user_id", { mode : "number"})
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
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
