CREATE TABLE "action_pick" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"image" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"benefits" text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_action_pick" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"action_pick_id" integer NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"status" varchar(255) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL
);
