import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "demo_credit_wallet",
    port: Number(process.env.DB_PORT) || 3306,
  },
  pool: { min: 2, max: 10 },
});

export default db;
