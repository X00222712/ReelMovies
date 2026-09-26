import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import {
  DATABASE_URL,
  DATABASE_AUTH_TOKEN
} from "$env/static/private";

const sqlite = new Database("movies.db");

export const db = drizzle({
  connection: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN
  }
});
