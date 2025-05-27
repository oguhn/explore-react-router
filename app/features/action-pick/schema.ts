import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const actionPick = pgTable("action_pick", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  description: text("description").notNull(),
  benefits: text("benefits").array().notNull(),
});

export const userActionPick = pgTable("user_action_pick", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  actionPickId: integer("action_pick_id").notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
  isDeleted: boolean("is_deleted").notNull().default(false),
  isCompleted: boolean("is_completed").notNull().default(false),
});
