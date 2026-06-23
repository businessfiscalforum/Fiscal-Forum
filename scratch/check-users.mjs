import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = neon(dbUrl);
const result = await sql`SELECT id, name, email, role, status FROM users LIMIT 20;`;
console.log("Database Users:");
console.table(result);
