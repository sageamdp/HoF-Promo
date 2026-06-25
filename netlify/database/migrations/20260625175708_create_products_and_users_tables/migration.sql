CREATE TABLE "products" (
	"id" serial PRIMARY KEY,
	"category" text NOT NULL,
	"sub_category" text,
	"name" text NOT NULL,
	"type" text,
	"potency" text,
	"dosage" text,
	"price" text,
	"sale_text" text,
	"image_url" text,
	"price_oz" integer,
	"price_half" integer,
	"price_wtr" integer,
	"price_8th" integer,
	"price_1g" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"username" text NOT NULL UNIQUE,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
