CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authenticator" (
	"credentialID" text NOT NULL,
	"userId" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"credentialPublicKey" text NOT NULL,
	"counter" integer NOT NULL,
	"credentialDeviceType" text NOT NULL,
	"credentialBackedUp" boolean NOT NULL,
	"transports" text,
	CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID"),
	CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "bid" DROP CONSTRAINT "bid_collection_id_collection_id_fk";
--> statement-breakpoint
ALTER TABLE "bid" DROP CONSTRAINT "bid_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "bid" ALTER COLUMN "status" SET DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "bid" ADD COLUMN "collectionId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "bid" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "collection" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerified" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bid" ADD CONSTRAINT "bid_collectionId_collection_id_fk" FOREIGN KEY ("collectionId") REFERENCES "public"."collection"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bid" ADD CONSTRAINT "bid_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collection" ADD CONSTRAINT "collection_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "bid" DROP COLUMN IF EXISTS "collection_id";--> statement-breakpoint
ALTER TABLE "bid" DROP COLUMN IF EXISTS "user_id";