
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const food = sqliteTable('food', {

  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),

  price: integer("price").notNull(), 
  image: text("img")
  
});

