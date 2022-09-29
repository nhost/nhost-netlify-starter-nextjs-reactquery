alter table "public"."speakers" drop constraint "speaker_social_key";
alter table "public"."speakers" add constraint "speakers_social_conference_id_key" unique ("social", "conference_id");
