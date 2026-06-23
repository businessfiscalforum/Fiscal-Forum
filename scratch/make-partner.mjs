import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const email = 'ashirwads813@gmail.com';
const sql = neon(dbUrl);

console.log(`Updating role to PARTNER for user: ${email}`);
const result = await sql`
  UPDATE users 
  SET role = 'PARTNER' 
  WHERE email = ${email}
  RETURNING id, name, email, role;
`;

console.log("Update result:", result);
