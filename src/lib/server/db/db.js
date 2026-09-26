import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const sqlite = new Database("movies.db");

import { drizzle } from 'drizzle-orm/libsql';
const db = drizzle({ connection: {
  url: process.env.TURSO_DATABASE_URL, 
  authToken: process.env.TURSO_AUTH_TOKEN 
}});
