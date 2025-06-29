import { boolean, pgPolicy, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { authUid, authenticatedRole } from "drizzle-orm/supabase";
import { profile } from "../profile/schema";
import { sql } from "drizzle-orm";

export const actionPick = pgTable("action_pick", {
  id: uuid("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }).notNull(),
  description: text("description").notNull(),
  benefits: text("benefits").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  userId: uuid("user_id").notNull().references(() => profile.userId),
}, (table) => [
  pgPolicy("action_pick_policy", {
    for: "insert",
    to: authenticatedRole,
    as: "permissive",
    withCheck: sql`${authUid} = ${table.userId}`,
  }),
  pgPolicy("action-select-policy", {
    for: "select",
    to: authenticatedRole,
    as: "permissive",
    using: sql`${authUid} = ${table.userId}`,
  })
]);

export const userActionPick = pgTable("user_action_pick", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id").notNull().references(() => profile.userId),
  profileId: serial("profile_id").notNull().references(() => profile.id),
  actionPickId: uuid("action_pick_id").notNull().references(() => actionPick.id),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  deletedAt: timestamp("deleted_at"),
  isDeleted: boolean("is_deleted").notNull().default(false),
  isCompleted: boolean("is_completed").notNull().default(false),
});
