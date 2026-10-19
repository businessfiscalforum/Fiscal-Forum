
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const vercelEnv = process.env.VERCEL_ENV;

let databaseUrl: string | undefined;

if (vercelEnv === "preview") {
  // Preview must use its dedicated test database.
  databaseUrl = process.env.PREVIEW_DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "PREVIEW_DATABASE_URL is required for Vercel Preview deployments."
    );
  }
} else {
  // Production and local development use DATABASE_URL.
  databaseUrl =
    process.env.DATABASE_URL ||
    process.env.NEON_DATABASE_URL;
}

if (!databaseUrl || databaseUrl.includes("placeholder")) {
  throw new Error("A valid database connection URL is required.");
}

const client = postgres(databaseUrl, {
  max: 1,
  prepare: false,
});

export const db = drizzle({ client });
