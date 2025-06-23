import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;


 // psql 'postgresql://neondb_owner:npg_jBK1QJVYTOH3@ep-crimson-dream-a8olysqq-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
 //Below configuration as to match like above format
 
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);
