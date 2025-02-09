import express from "express";
import {
  fundWallet,
  transferFunds,
  withdrawFunds,
} from "../controllers/walletController";

const router = express.Router();

router.post("/fund", async (req: express.Request, res: express.Response) => {
  await fundWallet(req, res);
});

router.post(
  "/transfer",
  async (req: express.Request, res: express.Response) => {
    await transferFunds(req, res);
  }
);

router.post(
  "/withdraw",
  async (req: express.Request, res: express.Response) => {
    await withdrawFunds(req, res);
  }
);

export default router;
