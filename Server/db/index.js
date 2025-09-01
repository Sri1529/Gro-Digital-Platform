import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Client } = pkg;

const client = new Client({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export const listTables = async () => {
  try {
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    console.log("Tables:", res.rows.map(r => r.table_name));
    return res.rows.map(r => r.table_name);
  } catch (err) {
    console.error("Error listing tables:", err);
    throw err;
  }
};


export const connectDB = async () => {
  try {
    console.log("dsc",process.env.DB_URL)
    await client.connect();
    console.log("PostgreSQL connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

export const getDB = () => client;
