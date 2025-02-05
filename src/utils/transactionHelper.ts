import { Knex } from "knex";
import db from "../config/db";

export const runTransaction = async (
  callback: (trx: Knex.Transaction) => Promise<any>
) => {
  const trx = await db.transaction();
  try {
    const result = await callback(trx);
    await trx.commit();
    return result;
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};
