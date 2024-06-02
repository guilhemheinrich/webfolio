--#region utilities function
CREATE
OR REPLACE FUNCTION update_modified_date() 
RETURNS TRIGGER AS $$ 
BEGIN NEW.modified_date := CURRENT_TIMESTAMP;

RETURN NEW;

END;

$$ LANGUAGE plpgsql;

--#endregion
--#region language setting
CREATE TABLE IF NOT EXISTS webfolio_languages (
    code VARCHAR(2) PRIMARY KEY,
    -- standard ISO 639-1
    fr_display VARCHAR(255)
);

ALTER TABLE
    webfolio_languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY default_select_for_all ON webfolio_languages AS PERMISSIVE FOR
SELECT
    USING (true);

INSERT INTO
    webfolio_languages (code, fr_display)
VALUES
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

CREATE TABLE IF NOT EXISTS webfolio_text_traduction (
    _id uuid default uuid_generate_v4() primary key,
    content text not null,
    language_code VARCHAR(2) not null,
    FOREIGN KEY (language_code) REFERENCES webfolio_languages(code)
);

ALTER TABLE
    webfolio_text_traduction ENABLE ROW LEVEL SECURITY;

CREATE POLICY default_select_for_all ON webfolio_text_traduction AS PERMISSIVE FOR
SELECT
    USING (true);

--#endregion
--#region Experience table
CREATE TABLE IF NOT EXISTS webfolio_experience (
    _id uuid default uuid_generate_v4(),
    created_date timestamp with time zone not null DEFAULT CURRENT_TIMESTAMP,
    modified_date timestamp with time zone not null DEFAULT CURRENT_TIMESTAMP,
    start_date timestamp with time zone not null,
    end_date timestamp with time zone,
    constraint experience_pkey primary key (_id)
);

ALTER TABLE
    webfolio_experience ENABLE ROW LEVEL SECURITY;

CREATE POLICY default_select_for_all ON webfolio_experience AS PERMISSIVE FOR
SELECT
    USING (true);

CREATE
OR REPLACE TRIGGER set_modified_date BEFORE
UPDATE
    ON webfolio_experience FOR EACH ROW EXECUTE FUNCTION update_modified_date ();

--#region Traductible fields
--#region title
CREATE TABLE IF NOT EXISTS webfolio_experience_title (
    _id uuid default uuid_generate_v4() primary key,
    experience_id uuid not null,
    text_content uuid,
    FOREIGN KEY (experience_id) REFERENCES webfolio_experience(_id),
    FOREIGN KEY (text_content) REFERENCES webfolio_text_traduction(_id),
    unique (experience_id, text_content)
);

ALTER TABLE
    webfolio_experience_title ENABLE ROW LEVEL SECURITY;

CREATE POLICY default_select_for_all ON webfolio_experience_title AS PERMISSIVE FOR
SELECT
    USING (true);

--#endregion
--#region description
CREATE TABLE IF NOT EXISTS webfolio_experience_description (
    _id uuid default uuid_generate_v4() primary key,
    experience_id uuid not null,
    text_content uuid,
    FOREIGN KEY (experience_id) REFERENCES webfolio_experience(_id),
    FOREIGN KEY (text_content) REFERENCES webfolio_text_traduction(_id),
    unique (experience_id, text_content)
);

ALTER TABLE
    webfolio_experience_description ENABLE ROW LEVEL SECURITY;

CREATE POLICY default_select_for_all ON webfolio_experience_description AS PERMISSIVE FOR
SELECT
    USING (true);

--#endregion
--#endregion
--#endregion
--#region Categories
CREATE TABLE IF NOT EXISTS webfolio_categories (code text primary key);

ALTER TABLE
    webfolio_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY default_select_for_all ON webfolio_categories AS PERMISSIVE FOR
SELECT
    USING (true);

CREATE TABLE IF NOT EXISTS webfolio_categories_label (
    _id uuid default uuid_generate_v4() primary key,
    category_code text not null,
    text_content uuid,
    FOREIGN KEY (category_code) REFERENCES webfolio_categories(code),
    FOREIGN KEY (text_content) REFERENCES webfolio_text_traduction(_id),
    unique (category_code, text_content)
);

ALTER TABLE
    webfolio_categories_label ENABLE ROW LEVEL SECURITY;

CREATE POLICY default_select_for_all ON webfolio_categories_label AS PERMISSIVE FOR
SELECT
    USING (true);

--#region label
--#endregion
--#endregion