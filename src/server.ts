import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import walletRoutes from "./routes/walletRoutes";

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/wallet", walletRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
