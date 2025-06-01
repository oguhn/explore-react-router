import { pgTable, serial, text, integer, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const userActionHistory = pgTable('user_action_history', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  action: varchar('action', { length: 100 }).notNull(),
  count: integer('count').notNull().default(1),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userRanking = pgTable('user_ranking', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  username: varchar('username', { length: 50 }).notNull(),
  displayName: varchar('display_name', { length: 100 }).notNull(),
  score: integer('score').notNull().default(0),
  rank: integer('rank'),
  lastActionAt: timestamp('last_action_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}); 