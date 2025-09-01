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


export const connectDB = async () => {
  try {
    await client.connect();
    console.log("PostgreSQL connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

export const getDB = () => client;
