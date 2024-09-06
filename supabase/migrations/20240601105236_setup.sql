--#region utilities function
create
or replace function update_modified_date () returns trigger as $$ 
BEGIN NEW.modified_date := CURRENT_TIMESTAMP;

RETURN NEW;

END;

$$ language plpgsql;

--#endregion
--#region language setting
create table if not exists
    webfolio_languages (
        code varchar(2) primary key,
        -- standard ISO 639-1
        fr_display varchar(255)
    );

alter table webfolio_languages enable row level security;

create policy default_select_for_all on webfolio_languages as PERMISSIVE for
select
    using (true);

insert into
    webfolio_languages (code, fr_display)
values
    ('zh', 'Chinois'),
    ('es', 'Espagnol'),
    ('en', 'Anglais'),
    ('hi', 'Hindi'),
    ('ar', 'Arabe'),
    ('bn', 'Bengali'),
    ('pt', 'Portugais'),
    ('ru', 'Russe'),
    ('ja', 'Japonais'),
    ('de', 'Allemand'),
    ('jv', 'Javanais'),
    ('ko', 'Coréen'),
    ('fr', 'Français'),
    ('te', 'Telugu'),
    ('mr', 'Marathi'),
    ('tr', 'Turc'),
    ('ta', 'Tamoul'),
    ('vi', 'Vietnamien'),
    ('ur', 'Ourdou'),
    ('it', 'Italien');

--#endregion
--#region Experience table
create table if not exists
    webfolio_experience (
        slug text primary key,
        created_date timestamp with time zone not null default current_timestamp,
        modified_date timestamp with time zone not null default current_timestamp,
        start_date timestamp with time zone,
        end_date timestamp with time zone,
        constraint slug check (slug ~ '^[a-zA-Z0-9_-]+$')
    );

alter table webfolio_experience enable row level security;

create policy default_select_for_all on webfolio_experience as PERMISSIVE for
select
    using (true);

create
or replace trigger set_modified_date before
update on webfolio_experience for each row
execute function update_modified_date ();

--#region Traductible fields
--#region title
create table if not exists
    webfolio_experience_title (
        id uuid default uuid_generate_v4 () primary key,
        experience_slug text not null,
        content text not null,
        language_code varchar(2) not null,
        foreign key (language_code) references webfolio_languages (code),
        foreign key (experience_slug) references webfolio_experience (slug) on delete cascade,
        unique (experience_slug, language_code)
    );

alter table webfolio_experience_title enable row level security;

create policy default_select_for_all on webfolio_experience_title as PERMISSIVE for
select
    using (true);

--#endregion
--#region description
create table if not exists
    webfolio_experience_description (
        id uuid default uuid_generate_v4 () primary key,
        experience_slug text not null,
        content text not null,
        language_code varchar(2) not null,
        foreign key (language_code) references webfolio_languages (code),
        foreign key (experience_slug) references webfolio_experience (slug) on delete cascade,
        unique (experience_slug, language_code)
    );

alter table webfolio_experience_description enable row level security;

create policy default_select_for_all on webfolio_experience_description as PERMISSIVE for
select
    using (true);

--#endregion
--#region short_description
create table if not exists
    webfolio_experience_short_description (
        id uuid default uuid_generate_v4 () primary key,
        experience_slug text not null,
        content text not null,
        language_code varchar(2) not null,
        foreign key (language_code) references webfolio_languages (code),
        foreign key (experience_slug) references webfolio_experience (slug) on delete cascade,
        unique (experience_slug, language_code)
    );

alter table webfolio_experience_short_description enable row level security;

create policy default_select_for_all on webfolio_experience_short_description as PERMISSIVE for
select
    using (true);

--#endregion
--#endregion
--#endregion
--#region section table
create table if not exists
    webfolio_section (
        slug text primary key,
        created_date timestamp with time zone not null default current_timestamp,
        modified_date timestamp with time zone not null default current_timestamp,
        constraint slug check (slug ~ '^[a-zA-Z0-9_-]+$')
    );

alter table webfolio_section enable row level security;

create policy default_select_for_all on webfolio_section as PERMISSIVE for
select
    using (true);

create
or replace trigger set_modified_date before
update on webfolio_section for each row
execute function update_modified_date ();

create table if not exists
    webfolio_section_content (
        id uuid default uuid_generate_v4 () primary key,
        section_slug text not null,
        content text not null,
        language_code varchar(2) not null,
        foreign key (language_code) references webfolio_languages (code),
        foreign key (section_slug) references webfolio_section (slug) on delete cascade,
        unique (section_slug, language_code)
    );

alter table webfolio_section_content enable row level security;

create policy default_select_for_all on webfolio_section_content as PERMISSIVE for
select
    using (true);

--#endregion
--#region Categories
create table if not exists
    webfolio_categories (code text primary key);

alter table webfolio_categories enable row level security;

create policy default_select_for_all on webfolio_categories as PERMISSIVE for
select
    using (true);

create table if not exists
    webfolio_categories_label (
        id uuid default uuid_generate_v4 () primary key,
        category_code text not null,
        content text not null,
        language_code varchar(2) not null,
        foreign key (language_code) references webfolio_languages (code),
        foreign key (category_code) references webfolio_categories (code),
        unique (category_code, language_code)
    );

alter table webfolio_categories_label enable row level security;

create policy default_select_for_all on webfolio_categories_label as PERMISSIVE for
select
    using (true);

--#region label
--#endregion
--#endregion