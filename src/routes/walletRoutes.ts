import express from "express";
import {
  fundWallet,
  transferFunds,
  withdrawFunds,
} from "../controllers/walletController.js";

const router = express.Router();

router.post("/fund", fundWallet);
router.post("/transfer", transferFunds);
router.post("/withdraw", withdrawFunds);

export default router;
