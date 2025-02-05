import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table
      .uuid("wallet_id")
      .references("id")
      .inTable("wallets")
      .onDelete("CASCADE");
    table.decimal("amount", 10, 2).notNullable();
    table
      .enum("transaction_type", ["FUND", "TRANSFER", "WITHDRAW"])
      .notNullable();
    table
      .enum("status", ["PENDING", "SUCCESS", "FAILED"])
      .notNullable()
      .defaultTo("SUCCESS");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transactions");
}
