import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";

export const product = pgTable("Product", {
  id: uuid("uuid").primaryKey().defaultRandom().notNull(),
  name: text("text").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  quantity: integer("quantity").notNull()
});