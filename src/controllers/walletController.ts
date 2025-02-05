import { Request, Response } from "express";
import db from "../config/db";
import { runTransaction } from "../utils/transactionHelper";

// 🏦 Fund Wallet
export const fundWallet = async (req: Request, res: Response) => {
  try {
    const { user_id, amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    await runTransaction(async (trx) => {
      await trx("wallets").where({ user_id }).increment("balance", amount);
      await trx("transactions").insert({
        wallet_id: user_id,
        amount,
        transaction_type: "FUND",
        status: "SUCCESS",
      });
    });

    return res.status(200).json({ message: "Wallet funded successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 🔁 Transfer Funds
export const transferFunds = async (req: Request, res: Response) => {
  try {
    const { sender_id, receiver_id, amount } = req.body;

    if (amount <= 0 || sender_id === receiver_id) {
      return res.status(400).json({ error: "Invalid transfer request" });
    }

    await runTransaction(async (trx) => {
      const sender = await trx("wallets").where({ user_id: sender_id }).first();
      const receiver = await trx("wallets")
        .where({ user_id: receiver_id })
        .first();

      if (!receiver || sender.balance < amount) {
        throw new Error("Insufficient balance or invalid receiver");
      }

      await trx("wallets")
        .where({ user_id: sender_id })
        .decrement("balance", amount);
      await trx("wallets")
        .where({ user_id: receiver_id })
        .increment("balance", amount);

      await trx("transactions").insert([
        {
          wallet_id: sender_id,
          amount,
          transaction_type: "TRANSFER",
          status: "SUCCESS",
        },
        {
          wallet_id: receiver_id,
          amount,
          transaction_type: "TRANSFER",
          status: "SUCCESS",
        },
      ]);
    });

    return res.status(200).json({ message: "Transfer successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

// 💸 Withdraw Funds
export const withdrawFunds = async (req: Request, res: Response) => {
  try {
    const { user_id, amount } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    await runTransaction(async (trx) => {
      const userWallet = await trx("wallets").where({ user_id }).first();

      if (userWallet.balance < amount) {
        throw new Error("Insufficient balance");
      }

      await trx("wallets").where({ user_id }).decrement("balance", amount);
      await trx("transactions").insert({
        wallet_id: user_id,
        amount,
        transaction_type: "WITHDRAW",
        status: "SUCCESS",
      });
    });

    return res.status(200).json({ message: "Withdrawal successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};
