create table "public"."notes" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "is_public" boolean not null default false,
    "author_id" uuid not null default auth.uid()
);


alter table "public"."notes" enable row level security;

CREATE UNIQUE INDEX todos_pkey ON public.notes USING btree (id);

alter table "public"."notes" add constraint "todos_pkey" PRIMARY KEY using index "todos_pkey";

alter table "public"."notes" add constraint "notes_author_id_fkey" FOREIGN KEY (author_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."notes" validate constraint "notes_author_id_fkey";

create policy "Anyone can select `public` notes"
on "public"."notes"
as permissive
for select
to public
using (is_public);


create policy "Authenticated users can insert their notes"
on "public"."notes"
as permissive
for insert
to authenticated
with check ((author_id = auth.uid()));


create policy "Authenticated users can select their notes"
on "public"."notes"
as permissive
for select
to authenticated
using ((author_id = auth.uid()));



