alter table "public"."speakers" alter column "conference_id" drop not null;
alter table "public"."speakers" add column "conference_id" uuid;
