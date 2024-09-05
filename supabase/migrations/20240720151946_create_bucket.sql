insert into
    storage.buckets (id, name, public)
values
    ('public_webfolio', 'public_webfolio', true);

alter table webfolio_experience
add column picture text;

alter table webfolio_section
add column picture text;