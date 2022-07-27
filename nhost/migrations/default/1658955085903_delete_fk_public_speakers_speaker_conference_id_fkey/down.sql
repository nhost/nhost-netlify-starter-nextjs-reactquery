alter table "public"."speakers"
  add constraint "speaker_conference_id_fkey"
  foreign key ("conference_id")
  references "public"."conferences"
  ("id") on update cascade on delete cascade;
