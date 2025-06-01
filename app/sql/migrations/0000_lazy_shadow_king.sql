CREATE TABLE "action_pick" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"image" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"benefits" text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_action_pick" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"profile_id" serial NOT NULL,
	"action_pick_id" uuid NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp,
	"status" varchar(255) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"is_deleted" boolean DEFAULT false NOT NULL,
	"is_completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_action_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"action" varchar(100) NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_ranking" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"username" varchar(50) NOT NULL,
	"display_name" varchar(100) NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"rank" integer,
	"last_action_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"username" varchar(50) NOT NULL,
	"display_name" varchar(100),
	"bio" text,
	"avatar_url" varchar(255),
	"email" varchar(255) NOT NULL,
	"ai_message" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "profile_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "user_action_pick" ADD CONSTRAINT "user_action_pick_user_id_profile_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profile"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_action_pick" ADD CONSTRAINT "user_action_pick_profile_id_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_action_pick" ADD CONSTRAINT "user_action_pick_action_pick_id_action_pick_id_fk" FOREIGN KEY ("action_pick_id") REFERENCES "public"."action_pick"("id") ON DELETE no action ON UPDATE no action;