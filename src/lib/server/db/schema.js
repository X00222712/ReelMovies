
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const food = sqliteTable('food', {

  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),

  price: integer().notNull(), 
  image: text()
  
});

