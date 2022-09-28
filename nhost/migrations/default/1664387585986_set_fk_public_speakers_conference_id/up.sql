alter table "public"."speakers"
  add constraint "speakers_conference_id_fkey"
  foreign key ("conference_id")
  references "public"."conferences"
  ("id") on update set null on delete set null;
