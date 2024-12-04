CREATE TYPE "public"."status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bid" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bid_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"collection_id" integer NOT NULL,
	"price" real NOT NULL,
	"user_id" integer NOT NULL,
	"status" "status" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collection" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "collection_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text NOT NULL,
	"stocks" integer NOT NULL,
	"price" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bid" ADD CONSTRAINT "bid_collection_id_collection_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collection"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bid" ADD CONSTRAINT "bid_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
