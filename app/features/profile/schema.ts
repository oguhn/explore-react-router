import { pgTable, text, timestamp, varchar, uuid, serial } from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: serial('id').primaryKey(),
  userId: uuid("user_id").notNull().unique(),
  username: varchar("username", { length: 50 }).notNull(),
  displayName: varchar("display_name", { length: 100 }),
  bio: text("bio"),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  aiMessage: text("ai_message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
