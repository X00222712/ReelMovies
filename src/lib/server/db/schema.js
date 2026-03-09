import { primaryKey } from 'drizzle-orm/gel-core';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const task = sqliteTable('task', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const food = sqliteTable('food', {

  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),

  price: integer().notNull(), 
  image: text()
  
});

