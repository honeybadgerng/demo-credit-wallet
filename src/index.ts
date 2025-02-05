import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { json } from "body-parser";
import db from "./config/db"; 
import userRoutes from "./routes/userRoutes"; 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(json());

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
