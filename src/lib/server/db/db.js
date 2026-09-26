import Database from "better-sqlite3";
import { drizzle } from 'drizzle-orm/libsql';

const sqlite = new Database("movies.db");

export const db = drizzle(sqlite);
