CREATE TABLE IF NOT EXISTS "advocates" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"city" text NOT NULL,
	"degree" text NOT NULL,
	"payload" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"years_of_experience" integer NOT NULL,
	"phone_number" bigint NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_city" ON "advocates" USING btree ("city");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_degree" ON "advocates" USING btree ("degree");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_experience" ON "advocates" USING btree ("years_of_experience");