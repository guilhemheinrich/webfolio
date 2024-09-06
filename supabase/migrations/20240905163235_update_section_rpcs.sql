--#region update section content
create
or replace function upsert_content (query_section_slug text, language_tag varchar(2), new_content text) returns VOID as $$
DECLARE
    translation_id UUID;
BEGIN
    -- Vérifie s'il existe une traduction pour cette expérience et cette langue
    SELECT id INTO translation_id
    FROM webfolio_section_content
    WHERE webfolio_section_content.section_slug = query_section_slug AND webfolio_section_content.language_code = language_tag;

    -- Si la traduction existe, on la met à jour
    IF FOUND THEN
        UPDATE webfolio_section_content
        SET content = new_content
        WHERE id = translation_id;
    ELSE
        -- Sinon, on crée une nouvelle traduction
        INSERT INTO webfolio_section_content (language_code, content, section_slug)
        VALUES (language_tag, new_content, query_section_slug)
        RETURNING id INTO translation_id;
    END IF;
END;
$$ language plpgsql;

--#endregion