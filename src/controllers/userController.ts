import { Request, Response, NextFunction } from "express";
import db from "../config/db";
import axios from "axios";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { full_name, email, phone } = req.body;

    // Check blacklist
    const karmaResponse = await axios.get(
      `https://api.lendsqr.com/adjutor/karma?email=${email}`,
      {
        headers: { Authorization: `Bearer ${process.env.LENDSQR_API_KEY}` },
      }
    );

    if (karmaResponse.data.is_blacklisted) {
      res
        .status(403)
        .json({ error: "User is blacklisted and cannot be onboarded" });
      return;
    }

    // Insert user and create wallet
    const [user] = await db("users")
      .insert({ full_name, email, phone })
      .returning(["id"]);

    await db("wallets").insert({ user_id: user.id, balance: 0 });

    res.status(201).json({
      message: "User registered successfully",
      data: { id: user.id, full_name, email },
    });
  } catch (error) {
    next(error); //  Pass error to middleware
  }
};
