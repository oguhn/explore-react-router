import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const userActionHistory = pgTable('user_action_history', {
  id: serial('id').primaryKey(),
  action: text('action').notNull(),
  count: integer('count').notNull(),
});

export const userRanking = pgTable('user_ranking', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  score: integer('score').notNull(),
}); 