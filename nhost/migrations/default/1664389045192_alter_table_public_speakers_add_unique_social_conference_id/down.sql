alter table "public"."speakers" drop constraint "speakers_social_conference_id_key";
alter table "public"."speakers" add constraint "speakers_social_key" unique ("social");
