
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';


export const food = sqliteTable('food', {
  num: integer('num').primaryKey({ autoincrement: true }),
  id: text().notNull(),
  name: text().notNull(),

  price: integer().notNull(), 
  image: text()
  
});

