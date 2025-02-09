import request from "supertest";
import { app } from "../index";

describe("Wallet API Tests", () => {
  let userId: string;

  beforeAll(async () => {
    const userRes = await request(app)
      .post("/api/users/register")
      .send({
        full_name: "Test User",
        email: `testuser${Date.now()}@example.com`, // Unique email for each test run
        phone: `070${Math.floor(10000000 + Math.random() * 90000000)}`, // Random Nigerian number
      });

    console.log("🔍 User Registration Response:", userRes.body); // Debugging output

    if (!userRes.body || !userRes.body.data || !userRes.body.data.id) {
      console.error("🚨 User Registration Failed:", userRes.body);
      throw new Error(" User registration failed: No user ID returned");
    }

    userId = userRes.body.data.id;
  });

  test("Fund wallet successfully", async () => {
    const res = await request(app)
      .post("/api/wallets/fund")
      .send({ user_id: userId, amount: 500 });

    console.log("💰 Fund Wallet Response:", res.body); // Debugging output

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Wallet funded successfully");
  });

  test("Transfer funds successfully", async () => {
    const receiverRes = await request(app).post("/api/users/register").send({
      full_name: "Jane Doe",
      email: "janedoe@example.com",
      phone: "08012345678",
    });

    console.log("📨 Receiver Registration Response:", receiverRes.body); // Debugging output

    if (
      !receiverRes.body ||
      !receiverRes.body.data ||
      !receiverRes.body.data.id
    ) {
      throw new Error("Receiver registration failed: No user ID returned");
    }

    const res = await request(app).post("/api/wallets/transfer").send({
      sender_id: userId,
      receiver_id: receiverRes.body.data.id,
      amount: 200,
    });

    console.log("💳 Transfer Response:", res.body); // Debugging output

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Transfer successful");
  });

  test("Withdraw funds successfully", async () => {
    const res = await request(app)
      .post("/api/wallets/withdraw")
      .send({ user_id: userId, amount: 100 });

    console.log("🏧 Withdraw Response:", res.body); // Debugging output

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Withdrawal successful");
  });
});
