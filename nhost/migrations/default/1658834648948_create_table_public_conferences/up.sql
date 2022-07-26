CREATE TABLE "public"."conferences" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "slug" text NOT NULL, "creator_user_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("creator_user_id") REFERENCES "auth"."users"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"), UNIQUE ("slug"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
