--#region update title
CREATE
OR REPLACE FUNCTION upsert_title (
    query_experience_slug text,
    language_tag VARCHAR(2),
    new_content TEXT
) RETURNS VOID AS $$
DECLARE
    translation_id UUID;
BEGIN
    -- Vérifie s'il existe une traduction pour cette expérience et cette langue
    SELECT id INTO translation_id
    FROM webfolio_experience_title
    WHERE webfolio_experience_title.experience_slug = query_experience_slug AND webfolio_experience_title.language_code = language_tag;

    -- Si la traduction existe, on la met à jour
    IF FOUND THEN
        UPDATE webfolio_experience_title
        SET content = new_content
        WHERE id = translation_id;
    ELSE
        -- Sinon, on crée une nouvelle traduction
        INSERT INTO webfolio_experience_title (language_code, content, experience_slug)
        VALUES (language_tag, new_content, query_experience_slug)
        RETURNING id INTO translation_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- SELECT
--     upsert_title (
--         'deepomics', -- ID de l'expérience
--         'fr', -- Code de langue
--         'Deepomics : un système d''information pour les données méta-omics' -- Contenu du titre
--     );
--#endregion
--#region update description
CREATE
OR REPLACE FUNCTION upsert_description (
    query_experience_slug text,
    language_tag VARCHAR(2),
    new_content TEXT
) RETURNS VOID AS $$
DECLARE
    translation_id UUID;
BEGIN
    -- Vérifie s'il existe une traduction pour cette expérience et cette langue
    SELECT id INTO translation_id
    FROM webfolio_experience_description
    WHERE webfolio_experience_description.experience_slug = query_experience_slug AND webfolio_experience_description.language_code = language_tag;

    -- Si la traduction existe, on la met à jour
    IF FOUND THEN
        UPDATE webfolio_experience_description
        SET content = new_content
        WHERE id = translation_id;
    ELSE
        -- Sinon, on crée une nouvelle traduction
        INSERT INTO webfolio_experience_description (language_code, content, experience_slug)
        VALUES (language_tag, new_content, query_experience_slug)
        RETURNING id INTO translation_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT
    upsert_description (
        'deepomics', -- ID de l'expérience
        'en', -- Code de langue
        '# Deepomics
        Hello there' -- Contenu du titre
    );

--#endregion