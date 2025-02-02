import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table
      .uuid("wallet_id")
      .references("id")
      .inTable("wallets")
      .onDelete("CASCADE");
    table.decimal("amount", 15, 2).notNullable();
    table
      .enum("transaction_type", ["FUND", "TRANSFER", "WITHDRAW"])
      .notNullable();
    table.enum("status", ["PENDING", "SUCCESS", "FAILED"]).defaultTo("PENDING");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transactions");
}
