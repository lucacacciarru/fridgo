import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const Product = pgTable("Product", {
  id: uuid("uuid").primaryKey().defaultRandom().notNull(),
  name: text("text").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});