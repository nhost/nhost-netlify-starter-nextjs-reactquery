alter table "public"."talks"
  add constraint "talks_conference_id_fkey"
  foreign key ("conference_id")
  references "public"."conferences"
  ("id") on update cascade on delete cascade;
