alter table "public"."talks"
  add constraint "talks_speaker_id_fkey"
  foreign key ("speaker_id")
  references "public"."speakers"
  ("id") on update cascade on delete cascade;
