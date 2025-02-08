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
    // const karmaResponse = await axios.get(
    //   `https://adjutor.lendsqr.com/v2/verification/karma/${email}`,
    //   { headers: { Authorization: `Bearer ${process.env.LENDSQR_API_KEY}` } }
    // );
    // if (karmaResponse.data.status === "success" && karmaResponse.data.data) {
    //   res
    //     .status(403)
    //     .json({ error: "User is blacklisted and cannot be onboarded" });
    //   return;
    // }

    // Insert user and create wallet
    const insertResult = await db("users").insert({ full_name, email, phone });

    if (!insertResult) {
      throw new Error(
        "User registration failed: Insertion did not return an ID"
      );
    }

    // Retrieve the last inserted user using the email or phone (since ID is not directly returned in MySQL)
    const user = await db("users").where({ email }).first();

    if (!user || !user.id) {
      console.error("🚨 Failed to retrieve user after insertion:", user);
      throw new Error(
        "User registration failed: No user ID found after insertion"
      );
    }

    // Create wallet for user
    await db("wallets").insert({ user_id: user.id, balance: 0 });

    res.status(201).json({
      message: "User registered successfully",
      data: { id: user.id, full_name, email },
    });
  } catch (error) {
    next(error); //  Pass error to middleware
  }
};
