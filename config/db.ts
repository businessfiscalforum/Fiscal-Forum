
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const databaseUrl =
  process.env.DATABASE_URL ||
  process.env.NEON_DATABASE_URL;

if (!databaseUrl || databaseUrl.includes("placeholder")) {
  throw new Error("A valid DATABASE_URL is required.");
}

const client = postgres(databaseUrl, {
  max: 1,
  prepare: false,
});

export const db = drizzle({ client });
