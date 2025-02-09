import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./src/routes/userRoutes";
import walletRoutes from "./src/routes/walletRoutes";

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/wallets", walletRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
